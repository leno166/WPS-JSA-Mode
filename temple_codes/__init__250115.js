Attribute Module_Name = "__init__"
/*
 * Module Name: __init__
 * Author: Leno
 * Date: 2025.01.11 10:55
 * Description:
 *      本模块用于初始化和管理与 Excel 工作簿相关的全局状态和操作。主要功能包括：
 *      1. 初始化应用程序和工作簿的全局变量。
 *      2. 管理工作簿的创建、关闭和保存操作。
 *      3. 提供工具函数，用于获取工作表中的最大行和最大列。
 *      4. 封装系统接口，简化工作簿的操作。
 *
 * 主要功能：
 *      - 初始化全局变量（如应用程序对象、工作簿对象、工作表对象等）。
 *      - 释放全局资源，避免内存泄漏。
 *      - 获取工作表中的最大行和最大列，用于数据处理。
 *      - 封装 Excel 的系统接口，提供便捷的工作簿操作（如新建、关闭、保存）。
 *
 * 全局变量：
 *      - app: 应用程序对象（Excel Table Application）。
 *      - tWb: 当前工作簿对象（ThisWorkbook）。
 *      - aWb: 活动工作簿对象（ActiveWorkbook）。
 *      - nWbs: 新建工作簿列表，用于管理多个工作簿。
 *      - tName, tPath, tFullName: 当前工作簿的名称、路径和完整路径。
 *      - BufferSh, InstSh: 当前工作簿中的特定工作表（Buffer 和 Instruction）。
 *      - tSh, aSh: 当前工作表和活动工作表。
 *      - tRg: 当前范围对象（Range）。
 *      - had_run: 标记初始化函数是否已运行。
 *      - totalCols, totalRows: 工作表中的总列数和总行数。
 *      - maxCol, maxRow: 工作表中的最大列和最大行。
 *
 * 主要函数：
 *      - init(): 初始化全局变量和应用程序状态。
 *      - release(): 释放全局资源，重置状态。
 *      - getGlobalRg(): 获取工作表中的最大行和最大列。
 *      - __getMaxRow(): 内部函数，计算工作表中的最大行。
 *      - __getMaxCol(): 内部函数，计算工作表中的最大列。
 *      - newWorkbook(): 创建新工作簿并添加到管理列表。
 *      - clsWorkbook(): 关闭指定工作簿并更新管理列表。
 *      - 另存(): 封装 Excel 的 SaveAs 方法，支持多种文件格式保存。
 *
 * 设计思路：
 *      1. 通过 init() 函数初始化全局状态，确保模块的依赖项在首次运行时正确加载。
 *      2. 使用 release() 函数释放资源，避免内存泄漏和状态污染。
 *      3. 提供工具函数（如 getGlobalRg）简化数据处理逻辑。
 *      4. 封装系统接口（如 newWorkbook、clsWorkbook、另存），降低代码耦合度，提高可维护性。
 *
 * 示例用法：
 *      // 初始化模块
 *      init();
 *
 *      // 获取工作表中的最大行和最大列
 *      getGlobalRg();
 *
 *      // 创建新工作簿并保存
 *      newWorkbook();
 *      另存('C:/path/to/file.xlsx', undefined);
 *
 *      // 释放资源
 *      release();
 *
 * License: Copyright © 2025 Leno Augenstern. All rights reserved.
 */
// TODO：初始化函数
// 变量
let app       = null;  // 应用程序对象

let tWb       = null;  // 当前工作簿对象
let aWb       = null;  // 活动工作簿对象

let nWbs      = null;  // 新建工作簿列表

let tName     = '';    // 当前工作簿名称
let tPath     = '';    // 当前工作簿路径
let tFullName = '';    // 当前工作簿完整路径

let BufferSh  = null;  // Buffer 工作表
let InstSh    = null;  // Instruction 工作表

let tSh       = null;  // 当前工作表
let aSh       = null;  // 活动工作表

let tRg       = null;  // 当前范围对象

let had_run   = false; // 初始化标记


/**
 * 初始化全局变量和应用程序状态。
 * 该函数仅在首次运行时生效，避免重复初始化。
 */
function init () {
	if (had_run) return;
	
	app = Windows.Application;
	
	tWb = app.ThisWorkbook;
	
	nWbs = [];
	
	tName = tWb.Name;
	tPath = tWb.Path;
	tFullName = tWb.FullName;
	
	BufferSh = tWb.Sheets('Buffer');
	InstSh = tWb.Sheets('Instruction');
	
	tSh = tWb.ActiveSheet;
	
	had_run = true;
}


/**
 * 释放全局资源并重置状态。
 * 该函数用于清理模块占用的资源，避免内存泄漏。
 */
function release () {
	app = null; 
	tWb = null;  
	aWb = null;
	nWbs = [];  
	tName = '';
	tPath = '';
	tFullName = '';
	BufferSh = null;
	InstSh = null;
	tSh = null;  
	aSh = null;  
	tRg = null; 
	had_run = false;
}


// =================================================================================
// TODO: 获取全局范围

// 常量
const CHUNK_SIZE = 2000;  // 分块大小，用于优化性能

// 变量
let totalCols = 0;  // 工作表中的总列数
let totalRows = 0;  // 工作表中的总行数

let maxCol = 0;  // 工作表中的最大列
let maxRow = 0;  // 工作表中的最大行


/**
 * 获取工作表中的最大行和最大列。
 * 该函数通过调用内部函数 __getMaxRow 和 __getMaxCol 来计算最大行和最大列。
 */
function getGlobalRg () {	
	totalCols = app.Columns.Count;
    totalRows = app.Rows.Count;
    
    __getMaxRow(), __getMaxCol();
}


/**
 * 内部函数：计算工作表中的最大行。
 * 该函数通过分块遍历列，找到每列的最后一行，并更新最大行数。
 */
function __getMaxRow () {
	const numChunks = Math.ceil(totalCols / CHUNK_SIZE);
	
	for (let chunkNum = 1; chunkNum <= numChunks; chunkNum++) {
		const startCol = 1 + (chunkNum - 1) * CHUNK_SIZE;
		const endCol = Math.min(chunkNum * CHUNK_SIZE, totalCols);
		
		for (let col = startCol; col <= endCol; col++) {
			const lastRow = tSh.Cells(totalRows, col).End(xlUp).Row;
			maxRow = Math.max(maxRow, lastRow);
		}
	}
}


/**
 * 内部函数：计算工作表中的最大列。
 * 该函数通过遍历行，找到每行的最后一列，并更新最大列数。
 */
function __getMaxCol () {
	for (let row = 1; row <= maxRow; row++) {
		const lastCol = tSh.Cells(row, totalCols).End(xlToLeft).Column;
		maxCol = Math.max(maxCol, lastCol);
	}
}


// =================================================================================
// 系统接口封装

/**
 * 创建新工作簿并添加到管理列表。
 * 该函数会创建一个新的工作簿，并将其添加到 nWbs 列表中。
 */
function newWorkbook () {
	nWbs.push(app.Workbooks.Add());
	
	aSh = nWbs[0].Sheets(1);
}


/**
 * 关闭指定工作簿并更新管理列表。
 * 如果关闭的是当前工作簿，则直接关闭；否则从 nWbs 列表中移除并关闭。
 * @param {Workbook} wb - 要关闭的工作簿对象。
 */
function clsWorkbook (wb) {
	if (wb === tWb) {
		tWb.Close();
		return;
	}
	for (let i = 0; i < nWbs.length; i++) {
		if (wb === nWbs[i]) {
			nWbs.splice(i, 1);
			wb.Close();
			aSh = tSh;
			return;
		}
	}
	wb.Close();
}


/**
 * 封装 Excel 的 SaveAs 方法，支持多种文件格式保存。
 * @param {string} path - 文件保存路径。
 * @param {number} style - 文件保存格式（如 xlWorkbookNormal、xlCSV）。
 */
function 另存 (path, style) {
	// style: .et -> xlWorkbookNormal; .csv -> xlCSV; other -> undefined
	ActiveWorkbook.SaveAs(path, style, undefined, undefined, undefined, undefined,
			 xlNoChange, 1, -1, undefined, undefined);
}
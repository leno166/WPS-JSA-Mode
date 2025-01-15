Attribute Module_Name = "tools"
/*
 * Module Name: tools
 * Author: Leno
 * Date: 2025.01.11 11:49
 * Description:
 *      本模块提供与字符串处理相关的工具函数，主要用于文件路径和名称的处理。
 *      主要功能包括：
 *      1. 在字符串末尾自增数字部分。
 *      2. 获取当前工作簿的完整路径，并替换或移除文件后缀。
 *
 * 主要功能：
 *      - 尾自增: 在字符串末尾自增数字部分，适用于生成唯一的文件名或路径。
 *      - 无后缀完整路径: 获取当前工作簿的完整路径，并支持替换或移除文件后缀。
 *
 * 设计思路：
 *      1. 通过正则表达式匹配字符串末尾的数字部分，实现自增功能。
 *      2. 通过路径处理函数，动态生成或修改文件路径，便于文件操作。
 *
 * 示例用法：
 *      // 自增文件名
 *      const newFileName = 尾自增('file-1'); // 输出: 'file-2'
 *      const newFileName2 = 尾自增('file'); // 输出: 'file-1'
 *
 *      // 获取无后缀路径或替换后缀
 *      const pathWithoutSuffix = 无后缀完整路径(); // 输出: 'C:/path/to/file'
 *      const pathWithNewSuffix = 无后缀完整路径('.csv'); // 输出: 'C:/path/to/file.csv'
 *
 * License: Copyright © 2025 Leno Augenstern. All rights reserved.
 */

// =================================================================================
// 字符串处理

/**
 * 在字符串末尾自增数字部分。
 * 如果字符串末尾已包含数字，则将其加 1；否则在末尾添加分隔符和数字 1。
 * @param {string} str - 需要处理的字符串。
 * @param {string} 分隔符 - 分隔符，默认为 '-'。
 * @returns {string} - 处理后的字符串。
 * 
 * 示例：
 *   尾自增('file-1') => 'file-2'
 *   尾自增('file') => 'file-1'
 */
function 尾自增 (str, 分隔符='-') {
	const lastSeparatorIdx = str.lastIndexOf(分隔符);
	
	if (lastSeparatorIdx !== -1 && lastSeparatorIdx !== str.length - 1) {
		const suffix = str.substring(lastSeparatorIdx + 1);
		
		if (/^\d+$/.test(suffix)) {
			const number = parseInt(suffix, 10) + 1;
        	return str.substring(0, lastSeparatorIdx + 1) + number;
		}
	}
	
	return `${str}${分隔符}1`;
}


/**
 * 替换或移除当前工作簿文件完整路径后缀。
 * @param {string} [str=''] - 替换后缀的字符串。默认移除文件后缀。
 * @param {string} [fullName=tFullName] - 文件的完整路径。如果未提供该参数，则使用全局变量 `tFullName`。
 * @returns {string} - 处理后的路径。如果路径中没有后缀，则直接拼接 `str`。
 * 
 * 示例：
 *   无后缀完整路径() => 'C:/path/to/file'
 *   无后缀完整路径('.csv') => 'C:/path/to/file.csv'
 */
function 无后缀完整路径 (str='', fullName=tFullName) {
	return fullName.substring(0, fullName.lastIndexOf('.')) + str;
}


// =================================================================================
// 单元格内插入图片

/**
 * 将图片路径转换为适合插入单元格的格式，并插入图片。
 * @param {string} imgPath - 图片路径。
 * @param {object} insertCell - 插入图片的目标单元格对象。
 */
function pathTurnImg (imgPath, insertCell) {
	if (isImgPath(imgPath)) {
		// 如果是File格式，则转换格式
		// 复制格式 -> file:///C:/Users/admin/Downloads/sowa_tast_img.png
		// 目标格式 -> C:\Users\admin\Downloads\sowa_tast_img.png
		if (imgPath.includes('file')) {
			imgPath = file_linkto(imgPath);
		}
		try {
			insertCell.GetRangeEx().InsertCellPicture(imgPath);
		}
		catch (err) {
			alert(imgPath + '图片不存在')
		}
	}
}


/**
 * 检查文件路径是否为图片路径。
 * @param {string} filePath - 文件路径。
 * @returns {boolean} - 如果是图片路径则返回 true，否则返回 false。
 */
function isImgPath (filePath) {
	const imgExs = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
	const ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
	
	return imgExs.includes(ext);
}


/**
 * 将 File 格式的路径转换为本地路径。
 * @param {string} link - File 格式的路径（如 file:///C:/...）。
 * @returns {string} - 转换后的本地路径（如 C:\...）。
 */
function file_linkto (link) {
	return link.replace('file:///', '').replace(/\//g, '\\');
}

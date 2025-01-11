Attribute Module_Name = "__test__print"
function test_print () {
	print([1, 2, [3, 4, 5]]);
}


function test_checkArrayType() {
    // 测试 1: 包含非数组对象
    let arr1 = [1, 2, { a: 3 }];
    console.log('测试 1: 包含非数组对象');
    console.log('输出: ' + __checkArrayType(arr1)); // 预期输出: 0
    console.log('--------------------');

    // 测试 2: 包含数组，且数组内部元素为基本数据类型
    let arr2 = [1, 2, [3, 4, 5]];
    console.log('测试 2: 包含数组，且数组内部元素为基本数据类型');
    console.log('输出: ' + __checkArrayType(arr2)); // 预期输出: 1
    console.log('--------------------');

    // 测试 3: 包含数组，且数组内部元素为对象
    let arr3 = [1, 2, [3, { a: 4 }]];
    console.log('测试 3: 包含数组，且数组内部元素为对象');
    console.log('输出: ' + __checkArrayType(arr3)); // 预期输出: 0
    console.log('--------------------');

    // 测试 4: 元素均为基本数据类型
    let arr4 = [1, 'hello', true, null, null];
    console.log('测试 4: 元素均为基本数据类型');
    console.log('输出: ' + __checkArrayType(arr4)); // 预期输出: 2
    console.log('--------------------');

    // 测试 5: 空数组
    let arr5 = [];
    console.log('测试 5: 空数组');
    console.log('输出: ' + __checkArrayType(arr5)); // 预期输出: 2
    console.log('--------------------');

    // 测试 6: 嵌套多层数组，且内部元素为基本数据类型
    let arr6 = [1, [2, [3, 4]], 5];
    console.log('测试 6: 嵌套多层数组，且内部元素为基本数据类型');
    console.log('输出: ' + __checkArrayType(arr6)); // 预期输出: 0
    console.log('--------------------');

    // 测试 7: 嵌套多层数组，且内部元素包含对象
    let arr7 = [1, [2, [3, { a: 4 }]], 5];
    console.log('测试 7: 嵌套多层数组，且内部元素包含对象');
    console.log('输出: ' + __checkArrayType(arr7)); // 预期输出: 0
    console.log('--------------------');
}


function test_printArray() {
    // 测试 1: 包含非数组对象
    let arr1 = [1, 2, { a: 3 }];
    console.log('测试 1: 包含非数组对象');
    console.log('输入: [1, 2, { a: 3 }]');
    __printArray(arr1); 
    console.log('--------------------');

    // 测试 2: 包含数组，且数组内部元素为基本数据类型
    let arr2 = [1, 2, [3, 4, 5], ['hello', 6]];
    console.log('测试 2: 包含数组，且数组内部元素为基本数据类型');
    console.log("输入: [1, 2, [3, 4, 5], ['hello', 6]]");
    __printArray(arr2);
    console.log('--------------------');

    // 测试 3: 包含数组，且数组内部元素为对象
    let arr3 = [1, 2, [3, { a: 4 }]];
    console.log('测试 3: 包含数组，且数组内部元素为对象');
    console.log('输入: [1, 2, [3, { a: 4 }]]');
    __printArray(arr3); 
    console.log('--------------------');

    // 测试 4: 元素均为基本数据类型
    let arr4 = [1, 'hello', true, null];
    console.log('测试 4: 元素均为基本数据类型');
    console.log("输入: [1, 'hello', true, null]");
    __printArray(arr4);
    console.log('--------------------');

    // 测试 5: 空数组
    let arr5 = [];
    console.log('测试 5: 空数组');
    console.log('输入: []');
    __printArray(arr5); 
    console.log('--------------------');

    // 测试 6: 嵌套多层数组，且内部元素为基本数据类型
    let arr6 = [1, [2, [3, 4]], 5];
    console.log('测试 6: 嵌套多层数组，且内部元素为基本数据类型');
    console.log('输入: [1, [2, [3, 4]], 5]');
    __printArray(arr6); 
    console.log('--------------------');

    // 测试 7: 嵌套多层数组，且内部元素包含对象
    let arr7 = [1, [2, [3, { a: 4 }]], 5];
    console.log('测试 7: 嵌套多层数组，且内部元素包含对象');
    console.log('输入: [1, [2, [3, { a: 4 }]], 5]');
    __printArray(arr7); 
    console.log('--------------------');
}
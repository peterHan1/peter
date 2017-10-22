var pollingCount=0,//轮询的初始值
    pollingMaxCount=40;//轮询的最大次数

    sessionInvalidToUrl = "http://etbc-qa.eslink.net.cn"; //测试环境
    // sessionInvalidToUrl = "http://app.eslink.cc/";  //正式环境

    gaslineColor = '#FF5E5A'; //管线颜色
(function ($) {
    /**
     * [pattern 格式化日期原型]
     * @param  {[String]} fmt [转换格式]
     * @return {[type]}     [description]
     */
    Date.prototype.pattern = function (fmt) {
        var o = {
                'M+': this.getMonth() + 1, //月份
                'd+': this.getDate(), //日
                'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
                'H+': this.getHours(), //小时
                'm+': this.getMinutes(), //分
                's+': this.getSeconds(), //秒
                'q+': Math.floor((this.getMonth() + 3) / 3), //季度
                'S': this.getMilliseconds() //毫秒
            },
            week = {
                '0': '/u65e5',
                '1': '/u4e00',
                '2': '/u4e8c',
                '3': '/u4e09',
                '4': '/u56db',
                '5': '/u4e94',
                '6': '/u516d'
            };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[this.getDay() + '']);
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    };
    $.extend($.fn, {
        /**
         * [baseUrl 请求地址]
         * @param  {[String]} url [请求地址]
         * @return {[type]}     [description]
         */
        baseUrl: function (url,params) {
            if($.fn.reqDataType() == "jsonp"){
                url = "http://10.101.0.32:8082" + url;
            }
            return url;//TODO
        },

        reqDataType:function () {
            return "json";
        },
        isEmpty: function (val) {//对象不为空
            if ((val == null || typeof(val) == "undefined") || (typeof(val) == "string" && val == "" && val != "undefined")) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * [openPage 跳转到指定页面]
         * @param  {[String]} pageUrl [指定页面链接地址]
         * @return {[type]}         [description]
         */
        openPage: function (pageUrl) {
            location.href = pageUrl;
        },
        /**
         * [getPramVal 获取链接地址的参数]
         * @param  {[String]} name  [获取链接地址对应参数的名称]
         * @param  {[type]} param [description]
         * @return {[type]}       [description]
         */
        getPramVal: function (name, param) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = (param || window.location.search).substr(1).match(reg);

            if (r != null) {
                //console.log(unescape(r[2]));
                return unescape(r[2]);
            }
            return null;
        },
        /**
         * [doAjaxCall 请求回调]
         * @param  {[object]} paramsJson   [参数json]
         * @param  {[function]} succCallback [成功回调]
         * @param  {[function]} failCallback [失败回调]
         * @param  {[boolean]} noShowMsg    [description]
         * @return {[type]}              [description]
         */
        doAjaxCall: function (paramsJson, succCallback, failCallback) {
            $.ajax({
                type: paramsJson.type || 'post',
                url: $.fn.baseUrl(paramsJson.url,paramsJson.params),
                data: paramsJson.params,
                dataType: (paramsJson.params && paramsJson.params.dataType )|| $.fn.reqDataType(),
                timeout: paramsJson.timeout || 50000,
                beforeSend: function (XMLHttpRequest) {
                    paramsJson.beforeFn && paramsJson.beforeFn();
                },
                success: function (data) {
                    if (data.responseCode === '100000') {
                        // console.log(JSON.stringify(data));
                        succCallback && succCallback(data);
                        // console.log("OK");
                    }else if(data.responseCode === '101002'){
                        window.top.location.href = sessionInvalidToUrl;
                    } else {
                        failCallback && failCallback(data);
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    paramsJson.completeFn && paramsJson.completeFn();
                },
                error: function (xhr, errorType, error) {
                    var showTimeoutError = paramsJson.showTimeoutError || true;
                    if (showTimeoutError) {
                        $.fn.layerMsg('网络超时，请检查网络');
                    }
                    paramsJson.errorFn && paramsJson.errorFn();
                }
            });
        },
        /**
         * [fmoney 格式化金额，将数字显示为金额，如：1,235.02]
         * @param  {[string]} s [传入需转换的数字]
         * @param  {[int]} n [取小数点后几位,不传默认为2]
         * @return {[string]}   [返回字符串如“1,235.02”]
         */
        fmoney: function (s, n) {
            s = s + "";
            var dig = (n != null && n >= 0 && n <= 20 ? n : 2);
            s = parseFloat(s).toFixed(dig) + '';
            var l = s.split('.')[0].split('').reverse(),
                r = s.split('.')[1],
                t = '';

            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
            }
            r = r ? '.' + r : '';
            return t.split('').reverse().join('') + r;
        },
        /**
         * [layerClose 关闭]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        layerClose: function (index) {
            layer.close(index);
        },
        /**
         * layerConfim 询问框
         */
        layerConfim: function (obj) {
            layer.confirm(obj.msg, function (index) {
                obj.succFn && obj.succFn(index);
            });
        },
        /**
         * zTreeFn 树
         * @param obj   操作对象
         * @param zNodes 数据
         * @param checkFn checkbox / radio 被勾选 或 取消勾选的事件回调函数
         * @param clickFn 被点击的事件回调函数
         */
        zTreeFn: function (obj, zNodes, checkOff, checkFn, clickFn) {
            var setting = {
                check: {
                    enable: checkOff
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onCheck: function () {
                        checkFn && checkFn();
                    },
                    onClick: function () {
                        clickFn && clickFn();
                    }
                }
            };

            $(function () {
                $.fn.zTree.init(obj, setting, zNodes);
            });
        },
        /**
         * closeSelfFrame 关闭自身iframe对应的弹窗
         */
        closeSelfFrame: function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        },
        // 移除数组中的某一项
        removeVal:function(arr,val){
          var index = this.indexOf(val);
          if (index > -1) {
            arr.splice(index, 1);
          }
        },
        /**
         * bootstrapTreeFn bootstrapTree
         * @param data 数据
         * @param multiSelect 是否允许多选
         * @param selectFn 选择回调函数
         * @param noSelectFn 未选择回调函数
         */
        bootstrapTreeFn: function (obj) {

            $(obj.tags).treeview({
                data: obj.data,
                selectedBackColor: "transparent",
                color: "#000",
                expandIcon: "glyphicon glyphicon-chevron-right",
                collapseIcon: "glyphicon glyphicon-chevron-down",
                multiSelect: obj.multiSelect,
                onhoverColor: '#fff',
                showIcon: obj.showIcon,
                selectedColor: obj.selectedColor,
                showCheckbox: obj.showCheckbox,
                canToggleSelected: obj.canToggleSelected,
                onNodeSelected: function (event, data) {
                    obj.selectFn && obj.selectFn(event, data);
                },
                onNodeUnselected: function (event, data) {
                    obj.noSelectFn && obj.noSelectFn(event, data);
                },
                onNodeChecked: function (event, data) {
                    if (data.isroot) {

                        var nodeArr = data.nodes;

                        if (nodeArr && nodeArr.length > 0) {
                            for (var key in nodeArr) {
                                if(nodeArr[key].checkable==true){
                                    $(event.target).treeview('checkNode', [nodeArr[key].nodeId, {silent: true}]);
                                }
                            }
                        }

                    } else {

                        var siblings = $(event.target).treeview('getSiblings', data.nodeId),
                            parentObj = $(event.target).treeview('getParent', data.nodeId),
                            len = 1;

                        for (var key in siblings) {
                            if (siblings[key].state.checked) {
                                len++;
                            }
                        }
                        if (parentObj.nodes&&parentObj.nodes.length === len) {
                            $(event.target).treeview('checkNode', [data.parentId, {silent: true}]);
                        }

                    }

                    obj.checkedFn && obj.checkedFn(event, data);
                },
                onNodeUnchecked: function (event, data) {
                    if (data.isroot) {

                        var nodeArr = data.nodes;

                        if (nodeArr && nodeArr.length > 0) {
                            for (var key in nodeArr) {
                                if(nodeArr[key].checkable!=false){
                                    $(event.target).treeview('uncheckNode', [nodeArr[key].nodeId, {silent: true}]);
                                }
                            }
                        }

                    } else {

                        $(event.target).treeview('uncheckNode', [data.nodeId, {silent: true}]);

                    }

                    obj.unCheckedFn && obj.unCheckedFn(event, data);

                }
            });
            $.fn.scrollNewFn('.nav-items', {suppressScrollX: false, suppressScrollY: false});
        },
        /**
         * openPageInFrame 弹框
         * @param htmlPage
         * @param options
         */
        openPageInFrame: function (htmlPage, options) {
            var defaultOptions = {
                title: false,
                closeBtn: 0,
                shadeClose: false,
                skin: 'query-mask-layer',
                area: ['480px', '320px'],
                resize: false,
                btn: [],
                content: htmlPage
            };
            options = $.extend(defaultOptions, options);
            var index = layer.open({
                type: 2,
                title: options.title,
                closeBtn: options.closeBtn,
                shadeClose: options.shadeClose,
                skin: options.skin,
                area: options.area,
                resize: options.resize,
                btn: options.btn,
                content: htmlPage,
                success: function (layero, index) {
                    var body = layer.getChildFrame('body', index);
                    options.succFn && options.succFn(body, index);
                },
                yes: function (index, layero) {
                    var body = layer.getChildFrame('body', index);
                    options.yesFn && options.yesFn(body, index);
                },
                btn2: function (index, layero) {
                    var body = layer.getChildFrame('body', index);
                    options.btn2Fn && options.btn2Fn(body, index);
                    return false;
                }
            });

            return index;
        },
        /**
         * pageUrl
         * @param url
         * @returns {string}
         */
        pageUrl: function (url) {
            return "../html/" + url;
        },
        /**
         * IntroducedPage 引入页面
         * @param url 引入地址
         * @constructor
         */
        introducedPage: function (url) {
             $.get(url, function (data) {
                 $('#inner-page').html(data);
             })
        },
        bindHack: function(e,choose,callback){
            if(typeof choose === "string"){
                $(document).off(e, choose).on(e, choose, function(){
                    callback && callback.call(this);
                });
            }else if(typeof choose === "function"){
                $(this).off(e).on(e,function(){
                    choose && choose.call(this);
                })
            }
        },
        /**
         * [localTableData 本地数据填充表格]
         * @param  {[type]} tableName [表格的选择器名称]
         * @param  {[array]} columns   [多行list数据]
         * @param  {[arr]} data       [加载的数据]
         * @param  {[boolean]}tabOptions  [表格的配置项]
         * @param  {[function]} succFn    [请求成功回调]
         * @param  {[function]} failledFn [请求失败回调]
         */
        //本地数据加载表格
        localTableData: function (tableName, columns, data, tabOptions, succFn, failledFn, pageNumber,pageSize) {
           // debugger;
            dbClickRowColor = true;
            if (tabOptions) {
                var dbClickRowColor = typeof(tabOptions.dbClickRowColor) == 'undefined' ? true : tabOptions.dbClickRowColor;
            }

            $(tableName).bootstrapTable('destroy').bootstrapTable($.extend({
                columns: columns,
                data: data,
                pagination: true,
                paginationLoop: false,
                paginationPreText: '上一页',
                paginationNextText: '下一页',
                pageList: [],
                striped: true,//隔行变色
                fixedColumns: true,
                fixedNumber: 0,
                pageNumber: pageNumber || 1,
                pageSize: pageSize || 9999999,
                //双击行事件，若双击有样式则需设置tabOptions.dbClickRow：true，双击事件处理函数写入tabOptions.dbClickRowFn即可。
                onDblClickRow: function (row, $element, field) {
                    if (dbClickRowColor) {
                        $($element).parent().children().not($element).removeClass("db-click");
                        $($element).toggleClass("db-click");
                    }
                    tabOptions && tabOptions.dbClickRowFn && tabOptions.dbClickRowFn(row, $element, field);
                }
            }, tabOptions));

            $.fn.scrollNewFn('.fixed-table-body', {suppressScrollX: false, suppressScrollY: false});

            $(tableName).bootstrapTable('load', data);
            setTimeout(function () {
                $(tableName).bootstrapTable('resetView');
                $('.fixed-table-body').perfectScrollbar('update');
            }, 10);
            succFn && succFn(data);

            // $(tableName).find(".bs-checkbox").find("input[type='checkbox']").after('<i class="checkbox-span glyphicon glyphicon-ok"></i>');

            /* //点击表格头部的全选
             $(document).on("click",".table th.bs-checkbox",function () {
             var checkBoxObj = $(this).find("input[type='checkbox']");
             var isChecked = checkBoxObj.is(":checked");
             checkBoxObj.prop("checked",!isChecked);
             $(this).parents(".fixed-table-header").siblings(".fixed-table-body").find(".bs-checkbox:not(th) >input[type='checkbox']").prop("checked",!isChecked);
             return false;
             })

             // 点击表格中的多选框
             $(document).on("click",".table .bs-checkbox:not(th)",function () {
             var checkBoxObj = $(this).find("input[type='checkbox']");
             var isChecked = checkBoxObj.is(":checked");
             var hasNoCheck = false;

             checkBoxObj.prop("checked",!isChecked);

             $(this).parents(".fixed-table-body").find(".bs-checkbox:not(th)>input[type='checkbox']").each(function () {
             if (!$(this).is(":checked")){
             hasNoCheck = true;
             }
             });
             var headCheck = $(".table th.bs-checkbox");
             headCheck.find("input[type='checkbox']").prop("checked",!hasNoCheck);
             return false;
             })*/

        },
        /**
         * [loadTabledata 异步请求填充表格]
         * @param  {[type]} tableName [表格的选择器名称]
         * @param  {[array]} columns   [多行list数据]
         * @param  {[string]} url       [异步请求地址]
         * @param  {[string]} tbParams [请求参数]
         * @param  {[boolean]}paginationFlag  [默认分页，传false则不分页]
         * @param  {[function]} succFn    [请求成功回调]
         * @param  {[function]} failledFn [请求失败回调]
         * @param  {[function]} responseParamsFn [请求回调的参数]
         */
        loadTabledata: function (tableName, columns, url, tbParams, tabOptions, succFn, failledFn,responseParamsFn) {

            var setIndex = '';

            setIndex = $.fn.layerLoading();

            var clickRowColor = true;
            if (tabOptions) {
                clickRowColor = typeof(tabOptions.clickRowColor) == 'undefined' ? true : tabOptions.clickRowColor;
                tabOptions.tabAutoView = typeof(tabOptions.tabAutoView) == "undefined" ? true : tabOptions.tabAutoView;
            }

            if ($(tableName).length > 0) {
                $(tableName).bootstrapTable('destroy');
            }
            $(tableName).bootstrapTable($.extend({
                columns: columns,
                height: 450,
                search: false,
                escape: true,//转义HTML字符串，替换 &, <, >, ", `, 和 ' 字符
                // clickToSelect:true,
                // searchOnEnterKey:true,
                // trimOnSearch:true,
                // showRefresh:false,
                // showToggle:false,
                // sortable:true,
                pagination: true,
                pageList: [],
                dataType: $.fn.reqDataType(),
                sidePagination: 'server',
                paginationLoop: false,
                striped: true,//隔行变色
                fixedColumns: true,
                fixedNumber: 0,
                queryParamsType: "limit",
                queryParams: function (params) {
                    var pageParams = {
                            pageSize: params.limit,
                            pageNo: function () {
                                return ((params.offset / params.limit == 0 ? 1 : params.offset / params.limit + 1 ) || 1);
                            }
                        },
                        paramsJson = $.extend(params, pageParams, tbParams);
                    return paramsJson;
                },//入参
                responseHandler: function (res) {
                    // debugger;
                    var resultStr = res;
                    responseParamsFn && responseParamsFn(res);
                    // debugger;
                    if (resultStr.responseCode === "100000") {
                        if (resultStr.result && resultStr.result.length === 0) {
                            $.fn.layerClose(setIndex);
                        }
                        return {
                            "rows": resultStr.result,
                            "total": resultStr.args.total
                        }
                    }else if(resultStr.responseCode === '101002'){
                        window.top.location.href = sessionInvalidToUrl;
                    } else {
                        $.fn.layerClose(setIndex);
                        $.fn.layerMsg(resultStr.message);
                        return {
                            "rows": [],
                            "total": 0
                        };
                    }
                },//回调
                contentType: "application/x-www-form-urlencoded",
                pageSize: 20,
                url: $.fn.baseUrl(url),
                onLoadSuccess: function (data) {
                    // console.log(data);
                    if (tabOptions.dblOnff) {
                        setTimeout(function () {
                            $(tableName).find('tbody tr').eq(0).find('td:first').trigger('click');
                        }, 1500);
                        $.fn.layerClose(setIndex);
                    } else {
                        $.fn.layerClose(setIndex);
                    }

                    if(tabOptions.tabAutoView){
                        $.fn.resizeTab(tableName,tabOptions.container,tabOptions.otherObj);
                    }

                    $.fn.scrollNewFn('.fixed-table-body', {suppressScrollX: false, suppressScrollY: false});
                    succFn && succFn(setIndex,data);
                },
                onLoadError: function (status) {
                    // console.log(status);
                    $.fn.layerMsg("数据加载失败,请刷新页面重试");
                    failledFn && failledFn(setIndex);
                },
                //单击事件
                onClickRow: function (row, $element, field) {
                    if (clickRowColor) {
                        $($element).parent().children().not($element).removeClass("db-click");
                        $($element).addClass("db-click");
                        // setIndex = $.fn.layerLoading();
                    }
                    // var index = $.fn.layerLoading();

                    tabOptions && tabOptions.clickRowFn && tabOptions.clickRowFn(row, $element, field, setIndex);
                },
                onPageChange: function (number, size) {

                    setIndex = $.fn.layerLoading();

                },
                onCheck: function (row) {
                    // console.log(row);
                    tabOptions && tabOptions.checkFn && tabOptions.checkFn(row);

                },
                onUncheck:function (row) {
                    // console.log(row);
                    tabOptions && tabOptions.uncheckFn && tabOptions.uncheckFn(row);
                },
                onCheckAll: function (rows) {
                    // console.log(rows);
                    tabOptions && tabOptions.checkAllFn && tabOptions.checkAllFn(rows);

                },
                onUncheckAll:function (rows) {
                    // console.log(rows);
                    tabOptions && tabOptions.uncheckAllFn && tabOptions.uncheckAllFn(rows);
                },
                onEmptyData: function () {
                    tabOptions && tabOptions.onEmptyData && tabOptions.onEmptyData();
                }
            }, tabOptions));

            setTimeout(function () {
                $(tableName).bootstrapTable('resetView');
            }, 10);
        },
        /**
         * [resizeTab 重置表格高度]
         * @param  {[type]} container [description]
         * @param  {[type]} otherObj  [description]
         * @return {[type]}           [description]
         */
        resizeTab:function(table,container,otherObj){
            debugger;
            container = container || '#personalpage';
            var totalHeight = $(container).height();
            var titleHeight = $(".list-items .title").height();
            otherObj = otherObj || '.items .items-btn';
            var otherHeight = $(otherObj).outerHeight();

            var tableHeight = totalHeight - titleHeight - otherHeight-10;
            table = table || ".table";
            $(table).bootstrapTable('resetView',{height:tableHeight});
        },
        /**
         * [download 导出文件]
         * @param  {[type]} url [导出文件接口url]
         */
        download:function(url){
            url = $.fn.baseUrl(url);
            $('body').append('<iframe id="iframe-active-page" name="download-file" style="position: absolute;visibility: hidden;overflow: hidden;width: 0;height: 0;">\
                          </iframe>\
                        <form id="form-download" action="'+ url +'" method="post" enctype="multipart/form-data" target="download-file" ></form>');

            $("#form-download").submit();
            var failCallback = function(){
                // $.fn.layermsg("系统繁忙，请稍后再试。");
                $("#iframe-active-page").remove();
                $("#form-download").remove();
            };
            var download=function () {
            };
            $.fn.setTime($.fn.download,failCallback);

        },
        /**
         * [setTime description]
         * @param {[type]} succsfn    [成功回调函数]
         * @param {[type]} failfn     [失败回调函数]
         * @param {[type]} count      [计数器初始值，默认0]
         * @param {[type]} maxCount   [计数器最多轮询次数，默认10]
         * @param {[type]} intervalMs [轮询间隔毫秒数]
         */
        setTime : function(succsfn,failfn,intervalMs){
            pollingCount= pollingCount || 0 ;
            pollingMaxCount = pollingMaxCount || 10;
            intervalMs = intervalMs || 150;
            var data = $("#iframe-active-page").contents().find("body").html();
            var t= setTimeout(function(){
                if(data == ''){
                    pollingCount++;
                    if(pollingCount >=pollingMaxCount+1 ){
                        failfn && failfn();
                        clearTimeout(t);
                        pollingCount = 0;//恢复初始值
                    }else{
                        $.fn.setTime(succsfn,failfn,intervalMs);
                    }
                }else{
                    succsfn && succsfn();
                    clearTimeout(t);
                    pollingCount = 0 ;//恢复初始值
                }
            },intervalMs);
        },
        /**
         * layerMsg 弹出框
         * @param message
         */
        layerMsg: function (message, time, succFn) {
            time = time || 2000;
            // console.log(message);
            layer.msg(message, {shade: [0.3, '#fff'], time: time}, function () {
                succFn && succFn();
            });
        },
        layerSuccMsg: function (message, time, succFn) {
            time = time || 2000;
            // console.log(message);
            layer.msg(message, {shade: [0.2, '#fff'], time: time, icon: 1}, function () {
                succFn && succFn();
            });
        },
        /**
         * scrollFn
         * @param obj
         */
        layerLoading: function () {
            var index = layer.load(1, {shade: [0.3, '#000']});
            return index;
        },
        /**
         * scrollNewFn
         * @param obj
         * @param opt.suppressScrollX 是否需要横向滚动条 true false
         */
        scrollNewFn: function (obj, opt) {
            opt.suppressScrollY = opt.suppressScrollY || false;
            $(obj).perfectScrollbar({
                suppressScrollX: opt.suppressScrollX,
                suppressScrollY: opt.suppressScrollY
            });
        },
        /**
         * resizeFn 隐患描述响应式
         */
        resizeFn: function (type, obj) {
            obj = obj || '.details';

            var vHeight = $(obj).height() - 92;
            var vWidth = $(obj).width() - 42;
            var pHeight = $('.p26-20').height();

            $('.wrap').height(vHeight);
            $('#aHide').width(vWidth);
            if (type) {
                location.reload();
            } else {
                if (vHeight < pHeight) {
                    $.fn.scrollNewFn('.wrap', {suppressScrollX: false});
                }
                $.fn.scrollNewFn('#aHide', {suppressScrollX: false});
                // $.fn.scrollNewFn('.list-items .itmes-scrollY',{suppressScrollX:true});
            }
        },
        /**
         * resetSelect
         * @param $obj
         */
        resetSelect: function ($obj) {
            if ($obj) {
                
                    $obj.each(function () {
                        var $thisSelect = $(this);
                        var $select2 = $thisSelect.parent(".bootstrap-select").next(),
                            $firstOpt = $thisSelect.find("option:first-child");

                        if(!$select2.hasClass("select2")){ //如果不是select2
                            $thisSelect.parent().find("button span.filter-option").text( $firstOpt.text() || "");

                            $thisSelect.parent().find("div.dropdown-menu ul li").each(function (index) {
                                if (index == 0) {
                                    if (!$(this).is(".selected")) {
                                        $(this).addClass("selected");
                                        $(this).find("a").attr("aria-selected", true);
                                    }
                                } else {
                                    $(this).removeClass("selected");
                                    $(this).find("a").attr("aria-selected", false);
                                }
                            });

                        }else{//如果是select2
                            $select2.find(".select2-selection__rendered").text($firstOpt.text() || "").attr("title",$firstOpt.text() || "");
                        }
                    });
                
            }
        },
        /**
         * [setSelectVal 设置 bootstrap-select的值]
         * @param {[type]} $obj [select下拉框的jquery对象]
         * @param {[type]} txt  [要设置的文本]
         */
        setSelectVal: function ($obj,txt) {
            if ($obj) {
                $obj.each(function () {
                    var $select = $(this);

                    $select.parent().find("button span.filter-option").text(txt || $(this).find("option:first-child").text() || "" );


                    // $select.selectpicker("refresh");
                    $select.parent().find("div.dropdown-menu ul li").each(function (index) {
                        var $this = $(this);
                        var $span = $this.find(".text");

                        if ( $span.text() == txt ) {
                            $this.find("a").trigger('click');

                        } 
                    });
                });
                $obj.parent(".bootstrap-select").children(".dropdown-toggle").blur();
            }
        },
        /**
         * showPic 展示图片
         * @param pics
         * @param title
         * @param start
         */
        showPic: function (pics, title, start) {
            var picData = {};
            picData.title = title || "查看图片";
            picData.id = start || 0;
            picData.start = start || 0;
            picData.data = [];
            for (var index in pics) {
                var item = {};
                var picIndex = parseInt(index) + 1;
                item.alt = "图片" + picIndex;
                item.pid = index;
                item.src = pics[index];
                item.thumb = "";
                picData.data.push(item);
            }
            layer.photos({
                photos: picData
                , anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
            });
        },
        trimNull: function (str, defaultStr) {
            if (!str || str === null || typeof str === "undefined" || $.fn.equalsIgnoreCase(str, "null")) {
                return defaultStr || "";
            } else {
                return str;
            }
        },
        reqParamToObj: function (param) {
            var result = {};
            if (param && param.length > 0) {
                var params = param.split("&")
                for (var index in params) {
                    var items = params[index].split("=");
                    if (items.length == 2) {
                        result[items[0]] = items[1];
                    }
                }
            }
            return result;
        },
        equalsIgnoreCase: function (str1, str2) {
            if (str1.toUpperCase() == str2.toUpperCase()) {
                return true;
            }
            return false;
        },
        getNYears: function (num, flag, startYear) {//生成从当前年份开始，num:间隔,flag:0-往前 1-往后
            flag = flag || 0;
            var currentYear = startYear || new Date().getFullYear();
            var result = [currentYear];
            for (var index = 1; index < num; index++) {
                result.push(flag == 0 ? currentYear - index : currentYear + index);
            }
            return result;
        },
        
        registerFullScreenEvent:function (node,fullscreenEvent,resumeEvent) {
            $(document).on('click',node,function () {
                var valIndex = $(this).attr('data-id') || '0';

                if(valIndex === '0'){

                    // $(this).parent().parent().next().hide();

                    $('#leftNav').hide();

                    $(this).attr('data-id','1').parent().parent().css({
                        'position':'fixed',
                        'top':'0',
                        'left':'0',
                        'width':'100%',
                        'heigth':'100%',
                        "z-index" :"2000"
                    });

                    fullscreenEvent && fullscreenEvent($(this));

                }else{

                    // $(this).parent().parent().next().show();

                    $('#leftNav').show();

                    $(this).attr('data-id','0').parent().parent().removeAttr('style');
                    resumeEvent && resumeEvent($(this));
                }

                var obj = $('.fixed-table-body table').attr('id');
                $('#'+obj).bootstrapTable('resetView').bootstrapTable('resetWidth');
                $('.fixed-table-body').perfectScrollbar('update');
                $('.item').perfectScrollbar('update');
            })
        },
        /**
         * setCookieFn 设置cookie
         * @param the_cookie
         * @param the_value
         */
        setCookieFn: function (the_cookie,the_value) {
            $.cookie(the_cookie, the_value, { path: '/' });
        },
        /**
         * getCookieFn 获取cookie
         * @param the_cookie
         */
        getCookieFn: function (the_cookie) {
            // $.cookie('the_cookie', 'the_value', { expires: 7, path: '/' });
            return $.cookie(the_cookie);
        },
        /**
         * delCookieFn 删除cookie
         * @param the_cookies
         */
        delCookieFn: function (the_cookies) {
            for(var key=0;key<the_cookies.length;key++){
                $.cookie(the_cookies[key], null);
            }
        },
        /**
         * putLocalStorage 把数据放到本地存储
         * @param key 键值
         * @param value 赋值
         */
        putLocalStorage: function(key, value) {
          window.localStorage.setItem(key, JSON.stringify(value));
        },
        /**
         * getLocalStorage 获取本地存储数据
         * @param key 键值
         * @returns {string}
         */
        getLocalStorage: function(key) {
          var obj = window.localStorage.getItem(key);
          if(obj && obj != "undefined" && obj != "null") {
            return JSON.parse(obj);
          }
          return "";
        },
        /**
         * removeLocalStorage 清除本地数据
         */
        removeLocalStorage: function(key) {
          if(key) {
            window.localStorage.removeItem(key);
          } else {
            for(var i=0;i<arguments.length;i++) {
              window.localStorage.removeItem(arguments[i]);
            }
          }
        },
        /**
         * iframeAutoFn iframe自适应宽度与高度
         * @param  {[string]} obj [信息窗体选择器]
         * @param  {[string]} type [地图登记,录入状态是0]
         * @param  {[string]} view [iframe的ID]
         * @param  {[function]} fn [地图登记]
         */
        iframeAutoFn: function (obj,type,view,fn) {
            type = type || '0';
            view = view || "#nodeIframe";

            $(window.parent.document).find(view).show();
            var thisWidth = $(document).find(obj).width();
            var thisheight = $(document).find('.map-box').height();
            if(type === '0'){ // 录入状态
                $(window.parent.document).find(view).load(function(){
                    $(this).height(thisheight);
                    $(this).width(thisWidth+40);
                    $(this).parent(".inpBox").height(thisheight);
                    fn&&fn();
                });
            }else{
                $(window.parent.document).find(view).height(thisheight);
                $(window.parent.document).find(view).width(thisWidth+40);
                $(window.parent.document).find(".inpBox").height(thisheight);
            }
        },
        /**
         * [infoWindowCenter 保证弹窗在页面居中]
         * @return {[type]} [description]
         */
        infoWindowCenter:function(lnglat,mapObj){
            //经纬度坐标转换为容器像素坐标
            var infoWinHeight = $(".map-box").height();
            var pixel = mapObj.lnglatTocontainer(lnglat);
            var centerX = parseInt(pixel.getX()); //加了60px，以免右侧列表遮挡弹窗。
            var centerY = parseInt(pixel.getY());
            var centerLngLat=[];

            centerY = centerY - infoWinHeight/2;

            if (centerX && centerY) {
                var ll = mapObj.containTolnglat(new AMap.Pixel(centerX, centerY));
                centerLngLat[0] = ll.getLng();
                centerLngLat[1] = ll.getLat();
                mapObj.setCenter(centerLngLat);
            }
        },
        /**
         * [windowOpenEvent 信息窗体打开的事件绑定函数]
         * @param  {[object]} infoWindow [信息窗体对象]
         * @param  {[object]} mapObj     [地图对象]
         */
        windowOpenEvent:function(infoWindow,mapObj){
            infoWindow.on("open",function(e,obj){
                setTimeout(function(){
                    var posObj = e.target.getPosition();
                    var pos = [posObj.lng,posObj.lat];
                    
                    $.fn.infoWindowCenter(pos,mapObj);
                },100);
                
            });
        },
        /**
         * [transAddress 关键字搜索，返回第一个匹配项的坐标]
         * @param  {[objcet]} address      [坐标对象]
         * @param  {[boolean]} goCenterFlag [是否重置地图中心点为匹配的第一条地址]
         * @param  {[function]} goCenterFn   [如果要设置地图中心点，设置的回调]
         * @return {[array]}              [经纬度]
         */
        searchAddress:function(address,goCenterFlag,goCenterFn){
            //关键字检索
            var placeSearchOptions = { //构造地点查询类
                pageSize: 5,
                pageIndex: 1,
                // map:map
            };

            var placeSearch = new AMap.PlaceSearch(placeSearchOptions);
            
            placeSearch.search(address, callback);
            var placeSearchRender = new Lib.AMap.PlaceSearchRender();

            function callback(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if(result){
                        var addressArr = result.poiList.pois[0].location;
                            addressArr = [addressArr.lng,addressArr.lat];
                        if(goCenterFlag){
                            map.setCenter(addressArr);
                            goCenterFn && goCenterFn(addressArr);
                        }
                    }
                }
            }
        },
        /**
         * [getSomethingByZoom 通过地图缩放等级获取需要的对象（属性包括：改变图标class、转义为国省市区等的层级]
         * @param  {[int]} mapZoom [地图登记]
         * @return {[object]}  obj   [想获取的对象]
         */
        getSomethingByZoom : function(mapZoom){
            var obj={
                imgClass:'', //设备图片的class
                strokeWeight:3 //管线宽度
            };

            switch(mapZoom){
                //国、省、市、区、街道
                case 3:
                case 4:
                case 5:
                case 6:
                    obj.imgClass = "xs-icon";
                    obj.showLevel = 1;
                    obj.strokeWeight = 1;
                    break;
                case 7:
                case 8:
                case 9:
                case 10:
                    obj.imgClass = "s-icon";
                    obj.showLevel = 2;
                    obj.strokeWeight = 1;
                    break;
                case 11:
                case 12:
                case 13:
                    obj.imgClass = "m-icon";
                    obj.showLevel = 3;
                    obj.strokeWeight = 1;
                    break;
                case 14:
                case 15:
                    obj.imgClass = "l-icon";
                    obj.showLevel = 4;
                    obj.strokeWeight = 2;
                    break;
                case 16:
                case 17:
                case 18:
                    obj.imgClass = "xl-icon";
                    obj.showLevel = 5;
                    obj.strokeWeight = 3;
                    break;
                default:
                    obj.imgClass = "xl-icon";
                    obj.showLevel = 5;
                    break;
            }

            return obj;
        },
        /**
         * [setZoomByShowlv 通过showlv来设置地图zoom]
         * @param {[type]} showlv [description]
         */
        getZoomByShowlv:function(showlv){
          var mapZoom;

          switch(showlv){
            //国、省、市、区、街道
            case 1:
                mapZoom = 3;
                break;
            case 2:
                mapZoom = 7;
                break;
            case 3:
                mapZoom = 11;
                break;
            case 4:
                mapZoom = 14;
                break;
            case 5:
                mapZoom = 16;
                break;
            // case 5:
            //     mapZoom = 17;
            //     break;
            default:
                // mapZoom = 17;
                mapZoom = 16;
                break;
          }
          return mapZoom;
        },
        /**
         * [getInfoByNodetype 通过设备类型获取相应的信息]
         * @param  {[string]} nodetype [节点类型]
         * @return {[object]}          [设备对象]
         */
        getInfoByNodetype:function(nodetype,childrenNodetype){
          var deviceObj = null,arrLength;

          arrLength = devicesArr.length;

          for(var i=0;i<arrLength;i++){
            if(devicesArr[i].code == nodetype || devicesArr[i].externalCode == nodetype){
              deviceObj = $.extend({},devicesArr[i]);

              var newImgUrl = deviceObj.img;
              desc = deviceObj.desc,
              newFaultImg = "";

              deviceObj.faultImg ? newFaultImg = deviceObj.faultImg : void(0);

              //节点的小类别,替换其设备图片
              if(nodetype == 4 && childrenNodetype && childrenNodetype != -1){
                  var  deviceChildren =  deviceObj.children;
                for(var j=0;j<deviceChildren.length;j++){
                  if(deviceChildren[j].childCode == childrenNodetype){
                    newImgUrl = deviceChildren[j].img;
                    desc = deviceChildren[j].desc;
                    newFaultImg = deviceChildren[j].faultImg;
                    break;
                  }
                }
              }
              deviceObj.img = newImgUrl;
              deviceObj.faultImg = newFaultImg;
              deviceObj.desc = desc;
              break;
            }
          }
          return deviceObj;
        },

        //获取最大最小经纬度
        getLatlngRange:function(){
            var lngArr = [],
                latArr = [];

            viewMap = map.getBounds();
            $.each(viewMap,function(key){
              if(key === 'gb' || key === '$a' || key === 'southwest' || key === 'northeast'){
                  lngArr.push(viewMap[key].lng);
                  latArr.push(viewMap[key].lat);
              }
            });

            maxLon = Math.max.apply(null, lngArr);
            minLon = Math.min.apply(null, lngArr);
            maxLat = Math.max.apply(null, latArr);
            minLat = Math.min.apply(null, latArr);
        },
        /**
         * [buildMarker 生成点标记]
         * @param  {[type]} obj [点对象，属性有经纬度和点的图标url]
         * @return {[type]}     [description]
         */
        buildMarker:function(obj,mapZoom,clickFn,dragSwitch){
            var targetLine,  //当前拖动的设备所在的管线
                cloneMarker, //当前设备的复制点标记
                index, //当前管线所在的数组下标
                lastPosition =  obj.position; //上一次拖动的点坐标
            var isCommonMark = 0; //是否是不同管道的公共点

            obj.position = obj.position || [obj.lon, obj.lat];
            obj.imgUrl = obj.imgUrl || obj.icon;
            // obj.offset = obj.offset || new AMap.Pixel(-50,-60);
            obj.offset = obj.offset || new AMap.Pixel(-10,-10);
            dragSwitch = dragSwitch ||  false;

            var marker = new AMap.Marker({
                map: map,
                position: obj.position,
                draggable: dragSwitch,
                content: obj.content || '<img class="img-icon '+ $.fn.getSomethingByZoom(mapZoom).imgClass +'" src="'+  obj.imgUrl+'">',
                offset: obj.offset,
                zIndex: 1000,
                extData:obj.extData || {}
            });

            marker.on('click',function (e) {
                var thisObj = this;
                clickFn&&clickFn(thisObj);
            });

           // 添加marker拖动事件
           marker.on('dragstart',function (e) {
              // 根据当前点的坐标找到目标管线
                  // isCommonMark = 0; //是否是不同管道的公共点
                  lastPosition =  marker.getPosition();
                  lastPosition = [lastPosition.lng,lastPosition.lat];

              marker.setzIndex(1003);

              index = window.polylineObjArr.indexOf(activeLine);

              targetLine = activeLine;
              dragLine = targetLine;
              //生成clone点标记并使其透明
              if(targetLine) {
                  cloneMarker = new AMap.Marker({
                      map: map,
                      position: lastPosition,
                      // draggable: true,
                      content:'<img class="img-icon opt50 '+ $.fn.getSomethingByZoom(mapZoom).imgClass +'" src="'+  obj.imgUrl+'">',
                      zIndex:1000,
                      offset: obj.offset
                  });

                  targetLine.setOptions({
                      strokeOpacity: 0.4
                  });
              }
           });

            //结束marker拖动事件
            marker.on('dragend',function (e) {
                var dragMarkPostion = [], //拖拽后点标记的坐标
                    oldPath = targetLine.getPath(),
                    newPath = [],
                    coordinateSet,
                    coordinateSetString = '',
                    address,
                    isLastMarker = false;

                dragMarkPostion = this.getPosition();

                oldPath.forEach(function (lnglat,idx) {
                    if(lnglat.lng ==  lastPosition[0] &&  lnglat.lat == lastPosition[1]){
                        newPath.push(dragMarkPostion);
                        isLastMarker = !!(idx == oldPath.length-1);
                    }else{
                        newPath.push(lnglat);
                    }
                });

                if(isLastMarker){
                  dltLineIcon && dltLineIcon.setPosition(dragMarkPostion); //删除管线的图标跟随
                  confirmLineIcon && confirmLineIcon.setPosition(dragMarkPostion); // 确认管线图标跟随
                }

                // targetLine.hide();
                cloneMarker.setMap(null);
                //重绘一条管线
                var newLineOptions = $.extend(targetLine.getOptions(),{path: newPath,strokeOpacity: 1});
                var changePolyline = new AMap.Polyline(newLineOptions);
                targetLine.setMap(null);

                changePolyline.on('click',function (e) {
                    pageForm.clickLineFn(changePolyline,e);
                });

                dragLine = changePolyline;
                activeLine = dragLine;
                
                window.polylineObjArr[index] = changePolyline;

                lastPosition[0] = dragMarkPostion.lng;
                lastPosition[1] = dragMarkPostion.lat;

                coordinateSet = changePolyline.getPath();

                for(var i=0; i<coordinateSet.length; i++){
                    coordinateSetString += coordinateSet[i].lng+','+coordinateSet[i].lat+'&';
                }

                coordinateSetString = coordinateSetString.substring(0,coordinateSetString.length-1);

                var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });

                geocoder.getAddress(dragMarkPostion, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        address = result.regeocode.formattedAddress; //返回地址描述
                    }
                });
            })

            return marker;
        },
        /**
         * [removeItem 删除一个数组中的某一项]
         * @param  {[type]} arr [description]
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        removeItem:function(arr,val){
          var index = arr.indexOf(val);
            if (index > -1) {
              arr.splice(index, 1);
            }
        },
        /**
         * [checkParams 校验参数是否为空。如果有一个校验没通过则提示，如：计划名称不能为空]
         * @param  {[Array]} checkParamsArr [入参必填数组，如[{val:"张三",title:"负责人"},{val:"",title:"计划名称"}]]
         * @return {[boolean]}  checkPassed [是否通过校验]
         */
        checkParams:function(checkParamsArr){
            var checkPassed = true;

            for(var i in checkParamsArr){
                var val = checkParamsArr[i].val;
                var title = checkParamsArr[i].title + "不能为空"; //提示文字

                if(val == "" ){
                    $.fn.layerMsg(title);
                    checkPassed = false;
                    break;
                }
            }

            return checkPassed;
        },
        // /**
        //  * [deviceListTab 右侧设备列表tab页切换]
        //  * @param  {[function]} clickFn [点击右侧tab页绑定的函数]
        //  */
        // deviceListTab:function(clickFn){
        //     $(".type-level>li>a").on("click",function(){
        //         var $this = $(this);
        //             plType = $this.data("id");

        //         if($this.hasClass("active")){
        //             return;
        //         }else{
        //             $(".type-level>li>a").removeClass("active");
        //             $this.addClass("active");
        //         }

        //         clickFn && clickFn(plType);
        //     });
        // },
        /**
         * [createLine 生成管道]
         * @param  {[type]} lineOpts  [线的属性]
         * @param  {[type]} extraData [自定义数据]
         * @return {[type]}           [description]
         */
        createLine :function(isfault,lineOpts,extData){
            //管道线宽
            var obj = $.fn.getSomethingByZoom(zoom),
                lineOptions = {},
                //线的默认属性
                lineDefaultOpts = {
                    map:map,
                    strokeOpacity: 1,//线透明度
                    strokeWeight: obj.strokeWeight,//线宽
                    extData:extData // 用户自定义属性
                };

                if(!Number(isfault)){//正常管道
                    lineOptions = {
                        strokeColor:gaslineColor,
                        strokeStyle: "solid"//线样式
                    };
                }else{//故障管道
                    lineOptions = {
                        isOutline: true,
                        outlineColor: "#f00",
                        strokeColor: "#cdcdcd",//线颜色
                        strokeStyle: "dashed",//线样式
                        strokeDasharray: [8,5]
                    };
                }

                lineDefaultOpts = $.extend(lineDefaultOpts,lineOptions);
                lineOpts = $.extend(lineDefaultOpts,lineOpts);

            var pipeline = new AMap.Polyline(lineOpts);

            return pipeline;
        }
    });
})(jQuery);

/**
 * [queryParams bootstrap table传给后台的参数]
 * @param  {[object]} params [pageSize 每页显示条数，pageNum：当前第几页]
 * @return {[object]}        [返回传给后台的参数]
 */
function queryParamsFn(params, tbParams) {
    // console.log(params,"url:"+url);
    // var serializeArr = $("#page-wrap form:visible").length === 0 ? $("#content-wrap form:visible").serializeArray() : $("#page-wrap form:visible").serializeArray(),
    pageParams = {
        pageSize: params.limit,
        pageNum: function () {
            return ((params.offset / params.limit == 0 ? 1 : params.offset / params.limit + 1 ) || 1);
        }
    },
        paramsJson = $.extend(tbParams, pageParams);
    return paramsJson;
}


/**
 * [responseHandler bootstrap table 接收后台返回的数据，并进行相应的处理]
 * @param  {[object]} res [后台返回的数据]
 * @return {[object]}     [rows：多行list数据，total：数据总条数]
 */
function responseHandler(res) {
    var resultStr = res;
    // console.log("total:"+resultStr.data.total);
    if (resultStr.responseCode === "100000") {
        return {
            "rows": resultStr.result,
            "total": resultStr.args.totalCount
        }
    } else {
        $.fn.layerMsg(resultStr.message);
        return {
            "rows": [],
            "total": 0
        };
    }


}


/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { BO_CODE_BOINFORMATION, IBOInformation } from "../../3rdparty/initialfantasy/index";
import { BORepositoryImportExport } from "../../borep/BORepositories";

/** 数据导出 */
export class DataExportApp extends ibas.Application<IDataExportView>  {

    /** 应用标识 */
    static APPLICATION_ID: string = "a6c6252c-ebc0-4feb-8c39-5a97862a68de";
    /** 应用名称 */
    static APPLICATION_NAME: string = "importexport_app_dataexport";

    constructor() {
        super();
        this.id = DataExportApp.APPLICATION_ID;
        this.name = DataExportApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        this.view.exportEvent = this.export;
        this.view.chooseBusinessObjectEvent = this.chooseBusinessObject;
        this.view.chooseTemplateEvent = this.chooseTemplate;
        this.view.addConditionEvent = this.addQueryCondition;
        this.view.removeConditionEvent = this.removeQueryCondition;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.criteria)) {
            this.criteria = new ibas.Criteria();
        }
        this.view.showCriteria(this.criteria);
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        super.run();
    }
    private criteria: ibas.ICriteria;
    /** 导入 */
    export(data: FormData): void {
        let that: this = this;
        let boRepository: BORepositoryImportExport = new BORepositoryImportExport();
        boRepository.export({
            criteria: this.criteria,
            onCompleted(opRslt: ibas.IOperationResult<string>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.messages(ibas.emMessageType.SUCCESS,
                        ibas.i18n.prop("sys_shell_upload") + ibas.i18n.prop("sys_shell_sucessful"));
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("importexport_exporting"));
    }
    /** 选择业务对象事件 */
    chooseBusinessObject(): void {
        let that: this = this;
        let criteria: ibas.ICriteria = new ibas.Criteria();
        criteria.noChilds = true;
        let condition: ibas.ICondition = criteria.conditions.create();
        condition.alias = "code";
        condition.value = ".";
        condition.operation = ibas.emConditionOperation.NOT_CONTAIN;
        ibas.servicesManager.runChooseService<IBOInformation>({
            boCode: BO_CODE_BOINFORMATION,
            chooseType: ibas.emChooseType.SINGLE,
            criteria: criteria,
            onCompleted(selecteds: ibas.List<IBOInformation>): void {
                that.criteria.boCode = selecteds.firstOrDefault().code;
                that.view.showConditions(null);
                that.view.showConditions(that.criteria.conditions);
            }
        });
    }
    /** 选择导出模板 */
    chooseTemplate(): void {
        let that: this = this;
        // 导出模板设置
        that.criteria.remarks = "TO_FILE_XLSX";// 目前只支持这种
    }
    private addQueryCondition(): void {
        this.criteria.conditions.create();
        this.view.showConditions(this.criteria.conditions);
    }
    private removeQueryCondition(condition: ibas.ICondition): void {
        this.criteria.conditions.remove(condition);
        this.view.showConditions(this.criteria.conditions);
    }
}
/** 数据导出-视图 */
export interface IDataExportView extends ibas.IView {
    /** 显示查询 */
    showCriteria(criteria: ibas.ICriteria): void;
    /** 选择业务对象 */
    chooseBusinessObjectEvent: Function;
    /** 选择导出模板 */
    chooseTemplateEvent: Function;
    /** 导出 */
    exportEvent: Function;
    /** 添加条件 */
    addConditionEvent: Function;
    /** 移出条件 */
    removeConditionEvent: Function;
    /** 显示结果 */
    showConditions(conditions: ibas.ICondition[]): void;
}
package org.colorcoding.ibas.importexport.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.FileData;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.repository.IBORepositorySmartService;
import org.colorcoding.ibas.importexport.bo.dataexporttemplate.DataExportTemplate;

/**
 * ImportExport仓库服务
 */
public interface IBORepositoryImportExportSvc extends IBORepositorySmartService {

	// --------------------------------------------------------------------------------------------//

	/**
	 * 导入数据
	 * 
	 * @param data
	 *            数据
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<String> importData(FileData data, String token);

	/**
	 * 导出数据
	 * 
	 * @param criteria
	 *            参数
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	IOperationResult<FileData> exportData(ICriteria criteria, String token);

	/**
	 * 获取业务对象schema
	 * 
	 * @param boCode
	 *            业务对象编码
	 * @param type
	 *            schema类型
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<String> schema(String boCode, String type, String token);

	/**
	 * 获取转换者名称
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	OperationResult<KeyText> fetchTransformer(ICriteria criteria, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-数据导出模板
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<DataExportTemplate> fetchDataExportTemplate(ICriteria criteria, String token);

	/**
	 * 保存-数据导出模板
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	OperationResult<DataExportTemplate> saveDataExportTemplate(DataExportTemplate bo, String token);

	// --------------------------------------------------------------------------------------------//

}

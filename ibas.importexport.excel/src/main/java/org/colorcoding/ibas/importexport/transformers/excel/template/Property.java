package org.colorcoding.ibas.importexport.transformers.excel.template;

/**
 * 模板-属性区，类属性
 * 
 * @author Niuren.Zhu
 *
 */
public class Property extends Area {

	public static final int OBJECT_STARTING_ROW = 2;
	public static final int OBJECT_STARTING_COLUMN = 0;

	public Property() {
		this.setStartingRow(OBJECT_STARTING_ROW);
		this.setEndingRow(this.getStartingRow());
		this.setStartingColumn(OBJECT_STARTING_COLUMN);
		this.setEndingColumn(AREA_AUTO_REGION);
	}

	private Class<?> bindingClass;

	public final Class<?> getBindingClass() {
		return bindingClass;
	}

	public final void setBindingClass(Class<?> bindingClass) {
		this.bindingClass = bindingClass;
	}

	@Override
	public String toString() {
		return String.format("{property: %s}", super.toString());
	}
}
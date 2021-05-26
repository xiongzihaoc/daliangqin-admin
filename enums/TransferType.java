package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.print.attribute.standard.DialogOwner;
import javax.validation.Valid;

/**
 * <p>
 * 转诊类型
 * </p>
 *
 * @author xiongzhilong
 * @since 2021-05-24
 */
@Getter
@ApiModel(value = "转诊类型")
public enum TransferType {
    /**
     * 向上转诊
     */
    @ApiModelProperty(value = "向上转诊")
    UP,
    /**
     * 向下转诊
     */
    @ApiModelProperty(value = "向下转诊")
    DOWN
}

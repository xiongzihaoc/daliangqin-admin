package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * <p>
 * 上下架枚举
 * </p>
 *
 * @author xiongzhilong
 * @since 2021-05-08
 */
@ApiModel(value = "上下架枚举")
public enum ShelvesStatus {
    /**
     * 上架
     */
    @ApiModelProperty(value = "上架")
    UP,
    /**
     * 下架
     */
    @ApiModelProperty(value = "下架")
    DOWN
}

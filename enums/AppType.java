package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

/**
 * <p>
 * app类型枚举
 * </p>
 *
 * @author xiongzhilong
 * @since 2021-04-30
 */
@Getter
@ApiModel(value = "app类型")
public enum AppType {
    /**
     * 病人端
     */
    @ApiModelProperty(value = "病人端")
    PATIENT,
    /**
     * 医生端
     */
    @ApiModelProperty(value = "医生端")
    DOCTOR;


    public static AppType getAppType(String name) {
        if (StringUtils.isBlank(name)) {
            return null;
        }
        for (AppType appType : values()) {
            if (appType.name().equals(name)) {
                return appType;
            }
        }
        return null;
    }
}

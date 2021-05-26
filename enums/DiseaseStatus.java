package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

/**
 * 病症类型
 *
 * @author wanzicong
 */
@Getter
@ApiModel(value = "病症状态")
public enum DiseaseStatus {
    @ApiModelProperty(value = "健康")
    HEALTH,
    @ApiModelProperty(value = "严重")
    SERIOUS,
    @ApiModelProperty(value = "中等")
    MEDIUM,
    @ApiModelProperty(value = "轻微")
    SLIGHT,
    @ApiModelProperty(value = "稍慢")
    SLOW,
    @ApiModelProperty(value = "稍快")
    FAST,
    @ApiModelProperty(value = "正常")
    NORMAL;

    public static DiseaseStatus getDiseaseStatus(String name) {
        if (StringUtils.isBlank(name)) {
            return null;
        }
        for (DiseaseStatus diseaseStatus : values()) {
            if (diseaseStatus.name().equals(name)) {
                return diseaseStatus;
            }
        }
        return null;
    }
}

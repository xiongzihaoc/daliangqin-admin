package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 档案病症状态
 *
 * @author Chen
 * @date 2021/5/22
 */
@Getter
@ApiModel(value = "档案病症状态")
public enum ArchivesDiseaseStatus {
    /**
     * 正常
     */
    @ApiModelProperty("正常")
    NORMAL,
    /**
     * 异常
     */
    @ApiModelProperty("异常")
    ABNORMAL
}

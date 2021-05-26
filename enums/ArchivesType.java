package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 档案内容基本类型
 *
 * @author Chen
 */
@Getter
@ApiModel(value = "档案内容基本类型")
public enum ArchivesType {
    /**
     * 从不
     */
    @ApiModelProperty("从不")
    NEVER,
    /**
     * 偶尔
     */
    @ApiModelProperty("偶尔")
    HAPLY,
    /**
     * 经常
     */
    @ApiModelProperty("经常")
    OFTEN,
    /**
     * 已戒
     */
    @ApiModelProperty("已戒")
    QUIT
}

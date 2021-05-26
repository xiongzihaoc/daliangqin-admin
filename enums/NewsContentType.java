package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 新闻内容类型
 *
 * @author Chen
 */
@Getter
@ApiModel(value = "新闻内容类型")
public enum NewsContentType {
    /**
     * 资讯
     */
    @ApiModelProperty("资讯")
    NEWS,
    /**
     * 视频
     */
    @ApiModelProperty("视频")
    VIDEO,
    /**
     * 直播
     */
    @ApiModelProperty("直播")
    LIVE
}

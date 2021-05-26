package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * <p>
 * 留言内容类型
 * </p>
 *
 * @author Qning
 * @since 2021/5/8
 */
@Getter
@ApiModel(value = "留言内容类型")
public enum ContentType {
    @ApiModelProperty("文字")
    TEXT,
    @ApiModelProperty("图片")
    PICTURE,
    @ApiModelProperty("语音")
    VOICE
}

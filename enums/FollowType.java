package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 随访类型 枚举类
 *
 * @author Chen
 * @date 2021/05/10
 */
@Getter
@ApiModel(value = "随访类型")
public enum FollowType {
    /**
     * 诊间随访
     */
    @ApiModelProperty(value = "诊间随访")
    CLINIC,
    /**
     * 语音随访
     */
    @ApiModelProperty(value = "语音随访")
    VOICE,
    /**
     * 上门随访
     */
    @ApiModelProperty(value = "上门随访")
    DOOR,
    /**
     * 视频随访
     */
    @ApiModelProperty(value = "视频随访")
    VIDEO
}

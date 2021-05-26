package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 慢性病史类型
 *
 * @author Chen
 * @date 2021/5/22
 */
@Getter
@ApiModel(value = "慢性病史类型")
public enum ChronicDiseaseType {
    /**
     * 糖尿病
     */
    @ApiModelProperty("糖尿病")
    DIABETES,
    /**
     * 高血压
     */
    @ApiModelProperty("高血压")
    HYPERTENSION,
    /**
     * 肿瘤
     */
    @ApiModelProperty("肿瘤")
    TUMOR,
    /**
     * 慢性支气管炎
     */
    @ApiModelProperty("慢性支气管炎")
    CHRONIC_BRONCHITIS,
    /**
     * 心脏病
     */
    @ApiModelProperty("心脏病")
    HEART_DISEASE,
    /**
     * 其他
     */
    @ApiModelProperty("其他")
    OTHER
}

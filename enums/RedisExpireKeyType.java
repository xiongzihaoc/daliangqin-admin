package com.daliangqing.app.common.enums;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

/**
 * <p>
 * redis过期key类型 枚举
 * </p>
 *
 * @author xiongzhilong
 * @since 2021-05-19
 */
@Getter
@AllArgsConstructor
@ApiModel(value = "redis过期key")
public enum RedisExpireKeyType {
    /**
     * 随访提醒
     */
    @ApiModelProperty(value = "随访提醒")
    FOLLOW_REMIND("随访提醒", "FOLLOW_REMIND:%s");

    private final String name;
    private final String key;

    public static RedisExpireKeyType getRedisExpireKeyType(String name) {
        if (StringUtils.isBlank(name)) {
            return null;
        }
        for (RedisExpireKeyType redisExpireKeyType : values()) {
            if (redisExpireKeyType.name.equals(name)) {
                return redisExpireKeyType;
            }
        }
        return null;
    }
}

import Joi from 'joi';

export const userValidationSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Tên người dùng phải là một chuỗi ký tự',
            'string.empty': 'Tên người dùng không được để trống',
            'string.min': 'Tên người dùng phải có ít nhất {#limit} ký tự',
            'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự',
            'any.required': 'Tên người dùng là bắt buộc'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email phải là một chuỗi ký tự',
            'string.empty': 'Email không được để trống',
            'string.email': 'Email không hợp lệ',
            'any.required': 'Email là bắt buộc'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': 'Mật khẩu phải là một chuỗi ký tự',
            'string.empty': 'Mật khẩu không được để trống',
            'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
            'any.required': 'Mật khẩu là bắt buộc'
        }),
    avatar: Joi.string()
        .uri()
        .optional()
        .messages({
            'string.base': 'Avatar phải là một chuỗi ký tự',
            'string.uri': 'Avatar phải là một URL hợp lệ'
        }),
    boards: Joi.array()
        .items(Joi.string())
        .optional()
        .messages({
            'array.base': 'Boards phải là một mảng',
            'string.hex': 'Board ID phải là một chuỗi hex hợp lệ',
            'string.length': 'Board ID phải có độ dài 24 ký tự'
        })
});

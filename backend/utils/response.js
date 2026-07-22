/* ==========================================
   SUCCESS RESPONSE
========================================== */

export const successResponse = (

    res,

    message = "Success",

    data = {},

    statusCode = 200

) => {

    return res.status(statusCode).json({

        success: true,

        message,

        data

    });

};

/* ==========================================
   ERROR RESPONSE
========================================== */

export const errorResponse = (

    res,

    message = "Something went wrong",

    statusCode = 500,

    errors = null

) => {

    return res.status(statusCode).json({

        success: false,

        message,

        errors

    });

};

/* ==========================================
   PAGINATED RESPONSE
========================================== */

export const paginatedResponse = (

    res,

    message,

    data,

    page,

    limit,

    total

) => {

    return res.status(200).json({

        success: true,

        message,

        page,

        limit,

        total,

        totalPages: Math.ceil(total / limit),

        data

    });

};

/* ==========================================
   CREATED RESPONSE
========================================== */

export const createdResponse = (

    res,

    message,

    data

) => {

    return res.status(201).json({

        success: true,

        message,

        data

    });

};

/* ==========================================
   NO CONTENT RESPONSE
========================================== */

export const noContentResponse = (res) => {

    return res.status(204).send();

};

export default {

    successResponse,

    errorResponse,

    paginatedResponse,

    createdResponse,

    noContentResponse

};
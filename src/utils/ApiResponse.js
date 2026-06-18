class ApiResponse {
    /**
 * Kirim response sukses yang konsisten
 * @param {object} res - Express response object
 * @param {object} options - { message, data, statusCode }
 */
    static success(res, { message = "Success", data = null, statusCode = 200 }) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    /**
      * Kirim response error yang konsisten
      * @param {object} res - Express response object
      * @param {object} options - { message, statusCode, errors }
      */

    static error(res, {message = "Internal Server Error", statusCode = 500, errors = null }) {
        return res.status(statusCode).json ({
            success: false,
            message,
            ...(errors && {errors}),
        });
    }
}

module.exports = ApiResponse;

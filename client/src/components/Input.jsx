import PropTypes from 'prop-types';

function Input({ type, label, placeholder, input, meta, ...rest }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type} className={meta.error && meta.touched ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'} placeholder={placeholder}  {...input} {...rest} />
            {meta.error && meta.touched && <span className='mt-2 text-sm text-red-600 dark:text-red-500 font-medium'>{meta.error}</span>}
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object
}

export default Input
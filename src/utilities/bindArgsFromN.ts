const bind_args_from_n = (fn, n, ...bound_args) => {
    return function(...args) {
        return fn(...args.slice(0, n-1), ...bound_args);
    };
}

export default bind_args_from_n;
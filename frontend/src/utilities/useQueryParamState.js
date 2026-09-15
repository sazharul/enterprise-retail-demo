const useQueryParamState = (paramName, setStateFunction, isNumber) => {
    const searchParams = new URLSearchParams(location.search);
    const paramValues = searchParams.getAll(paramName.toLowerCase());
    setStateFunction(paramValues.map((value) => parseInt(value, 10)));

    if (isNumber) {
        setStateFunction(paramValues.map((value) => parseInt(value, 10)));
    } else {
        setStateFunction(paramValues.map((value) => (value)));
    }
};
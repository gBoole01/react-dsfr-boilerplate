import { useLocation, useParams } from 'react-router-dom';

function useBasePath() {
    const location = useLocation();
    const params = useParams<Record<string, string>>();

    const basePath = Object.values(params).reduce(
        (path, param) => path?.replace('/' + param, '/'),
        location.pathname
    );

    return basePath ?? '/';
}

export default useBasePath;

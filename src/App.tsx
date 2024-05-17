import Layout from '@src/layout';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}

export default App;

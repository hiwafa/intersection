import React from 'react';
import { Column, Row } from 'antd';
import SidebarComponent from './SideBar';
import HeaderComponent from './Header';

const styles = {
    container: {
        height: '100vh'
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
        padding: 30,
        backgroundColor: '#F7F8FC'
    }
};

class App extends React.Component {

    state = { selectedItem: 'Tickets' };

    render() {
        const { selectedItem } = this.state;
        return (
            <Row className={styles.container}>

                <SidebarComponent selectedItem={selectedItem}
                    onChange={(selectedItem) => this.setState({ selectedItem })} />

                <Column style={{display: 'flex', flexGrow: 1}} className={styles.mainBlock}>
                    <HeaderComponent title={selectedItem} />
                    <div className={styles.content}>
                        <span>Content</span>
                    </div>
                </Column>

            </Row>
        );
    }
}

export default App;
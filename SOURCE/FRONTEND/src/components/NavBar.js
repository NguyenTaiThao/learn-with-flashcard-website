import React, { Component } from 'react'
import '@styles/NavBar.css'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
    HomeOutlined,
    EqualizerRounded,
    FileCopyOutlined,
    FolderOpenOutlined,
    GroupOutlined,
} from '@material-ui/icons/';


export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Drawer
                    open={false}
                    className="nav-bar"
                    variant="permanent"
                >
                    {this.listMenu()}
                </Drawer>
            </>
        )
    }

    listMenu = () => (
        <div>
            <List>
                <ListItem button>
                    <ListItemIcon><HomeOutlined /></ListItemIcon>
                    <ListItemText primary="Trang chủ" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><EqualizerRounded /></ListItemIcon>
                    <ListItemText primary="Tiến độ" />
                </ListItem>

                <Divider />

                <ListItem button>
                    <ListItemIcon><FileCopyOutlined /></ListItemIcon>
                    <ListItemText primary="Học phần" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><FolderOpenOutlined /></ListItemIcon>
                    <ListItemText primary="Thư mục" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><GroupOutlined /></ListItemIcon>
                    <ListItemText primary="Lớp học" />
                </ListItem>
            </List>
            <Divider />

        </div>
    )
}

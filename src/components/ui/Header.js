import React, {useState, useEffect} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assets/logo.svg";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button'
import {Link} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from "@material-ui/core/styles";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from "@material-ui/icons/Menu";
import {IconButton} from "@material-ui/core";
import List from  "@material-ui/core/List";
import ListItem from  "@material-ui/core/ListItem";
import ListItemText from  "@material-ui/core/ListItemText";

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em"
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em"
        }
    },
    logoContainer: {
      padding: 0,
        "&:hover": {
          backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
    },
    menu: {
        backgroundColor: theme.palette.common.arcBlue,
        color: "white",
        borderRadius: "0"
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity:1
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px",
    },
    drawerIconContainer : {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.arcBlue,
    },
    drawerItem: {
      ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.arcOrange,
    },
    drawerItemSelected: {
        opacity: 1
    }
}));

export default function Header(props){
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [openDrawer, setOpenDrawer] = useState(false);
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpenMenu(true)
    }

    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false);
    }

    const menuOtpions = [{name: "Services", link: "/services"}, {name: "Custom services Development", link: "/customsoftware"},
        {name: "Mobile App development", link: "/mobileapps"}, {name:"Website development", link: "/websites"}]

    const handleMenuItemClick = (e, index)  => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(index);
    }

    useEffect(() => {
        switch (window.location.pathname) {
            case "/":
                if(value !==0) {
                    setValue(0)
                }
                break;
            case "/service":
                if(value !==1) {
                    setValue(1)
                    setSelectedIndex(1)
                }
                break;
            case "/customsoftware":
                if(value !==2) {
                    setValue(1)
                    setSelectedIndex(1)
                }
                break;
            case "/mobileapps":
                if(value !==1) {
                    setValue(1)
                    setSelectedIndex(2)
                }
                break;
            case "/websites":
                if(value !==4) {
                    setValue(1)
                    setSelectedIndex(3)
                }
                break;
            case "/revolution":
                if(value !==2) {
                    setValue(2)
                }
                break;
            case "/about":
                if(value !==3) {
                    setValue(3)
                }
                break;
            case "/contact":
                if(value !==4) {
                    setValue(4)
                }
                break;
            case "/estimate":
                if(value !==5) {
                    setValue(5)
                }
                break;
            default:
                break;
        }
    }, [value])

    const tabs  = (
        <React.Fragment>
            <Tabs
                className={classes.tabContainer}
                value={value}
                onChange={handleChange}
            >
                <Tab
                    className={classes.tab}
                    component={Link}
                    to="/"
                    label="Home"
                />
                <Tab
                    aria-owns={anchorEl ? "simple-menu": undefined}
                    aria-haspopup={anchorEl ? "true" : undefined}
                    className={classes.tab}
                    component={Link}
                    onMouseOver={(event) => handleClick(event)}
                    to="/services"
                    label="Service"
                />
                <Tab
                    className={classes.tab}
                    component={Link}
                    to="/revolution"
                    label="The Resolution"
                />
                <Tab
                    className={classes.tab}
                    component={Link}
                    to="/about"
                    label="About us"
                />
                <Tab
                    className={classes.tab}
                    component={Link}
                    to="/contact"
                    label="Contact us"
                />
            </Tabs>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
            >
                Free estimate
            </Button>
            <Menu id="simple-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  classes={{paper: classes.menu}}
                  MenuListProps={{onMouseLeave: handleClose}}
                  elevation={0}
            >
                {menuOtpions.map((option, i) => (
                    <MenuItem
                        key={option}
                        component={Link}
                        to={option.link}
                        classes={{root: classes.menuItem}}
                        onClick={(event) => {
                            handleMenuItemClick(event, i);
                            setValue(1);
                            handleClose();
                        }}
                        selected={i===selectedIndex && value === 1}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{paper: classes.drawer}}
            >
                <List disablePadding>
                    <ListItem
                        component={Link}
                        divider button
                        to="/"
                        onClick={() => {
                            setOpenDrawer(false); setValue(0)
                        }}
                        selected={value === 0}
                    >
                        <ListItemText
                            disableTypography
                            className={value===0 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                        >
                            Home
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        component={Link}
                        divider
                        button
                        to="/services"
                        onClick={() => {
                            setOpenDrawer(false); setValue(1)
                        }}
                        selected={value === 1}
                    >
                        <ListItemText
                            disableTypography
                            className={value===1 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                        >
                            Services
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        component={Link}
                        divider button
                        to="/revolution"
                        onClick={() => {
                            setOpenDrawer(false); setValue(2)
                        }}
                        selected={value ===2}
                    >
                        <ListItemText
                            disableTypography
                            className={value===2 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                        >
                            The Revolution
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        component={Link}
                        divider button
                        to="/about"
                        onClick={() => {
                            setOpenDrawer(false); setValue(3)
                        }}
                        selected={value === 3}
                    >
                        <ListItemText
                            disableTypography
                            className={value===3 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                        >
                            About us
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        component={Link}
                        divider
                        button
                        to="/contact"
                        onClick={() => {
                            setOpenDrawer(false); setValue(4)
                        }}
                        selected={value === 4}
                    >
                        <ListItemText
                            disableTypography
                            className={value===4 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                        >
                            Contact Us
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        component={Link}
                        divider button to="/estimate"
                        onClick={() => {
                            setOpenDrawer(false); setValue(5)
                        }}
                        className={classes.drawerItemEstimate}
                        selected={value === 5}
                    >
                        <ListItemText
                            disableTypography
                            className={value===5 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                        >
                            Free estimate
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton
                className={classes.drawerIconContainer}
                disableRipple
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                 <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed">
                    <Toolbar disableGutters={true}>
                        <Button
                            onClick={() => setValue(0)}
                            component={Link}
                            to="/"
                            className={classes.logoContainer}
                            disableRipple
                        >
                            <img src={logo}
                                 alt="company logo"
                                 className={classes.logo}
                            />
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}
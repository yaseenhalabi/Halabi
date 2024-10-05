import { Tabs } from 'expo-router';
import TabBar from '../../../components/bottom tab navigator/TabBar';
import TabBarIcon from '../../../components/bottom tab navigator/TabBarIcon';
import peopleIcon from '../../../assets/images/people-icon-white.png';
import peopleIconBlur from '../../../assets/images/people-icon-white-blur.png';
import tagsIcon from '../../../assets/images/tags-icon-white.png'
import tagsIconBlur from '../../../assets/images/tags-icon-white-blur.png'
import Header from '../../../components/Header';

export default function TabLayout() {
    return (
        <Tabs 
            tabBar={props => <TabBar {...props}/>} 
            screenOptions={{
                headerShown: false
            }}
        >
            <Tabs.Screen redirect name="index" />
            <Tabs.Screen
                name="my-contacts"
                options={{
                    title: 'My Contacts',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={peopleIcon} blurSource={peopleIconBlur}/>,
                }}
            />
            <Tabs.Screen
                name="my-tags"
                options={{
                    title: 'My Tags',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={tagsIcon} blurSource={tagsIconBlur}/> ,
                }}
            />
        </Tabs>
    );
}

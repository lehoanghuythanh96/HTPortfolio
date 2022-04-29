import {dialogContent, toggleDialog} from "../components/UI_Components/UI_Dialog";
import {UserProfileMenuCard} from "../components/shared/authenticationShared/userProfileMenuCard";
import {userRoles} from "./userinfo.interface";

interface menuItem {
    id: number
    name: string
    icon: string
    link: string | null
    action: () => void
    roles: userRoles[]
}

export const MenuItems : menuItem[] = [
    {
        id: 1,
        name: `Home`,
        icon: `<i class="fa-solid fa-house-heart"></i>`,
        link: '/',
        action: () => {return},
        roles: []
    },
    {
        id: 2,
        name: `Account`,
        icon: `<i class="fa-solid fa-user"></i>`,
        link: null,
        action: () => {
            toggleDialog.next(true)
            dialogContent.next(UserProfileMenuCard)
        },
        roles: [userRoles.subscriber, userRoles.admin]
    },
    {
        id: 3,
        name: `Menu`,
        icon: `<i class="fa-solid fa-bars"></i>`,
        link: null,
        action: () => {
            toggleDialog.next(true)
            dialogContent.next(UserProfileMenuCard)
        },
        roles: []
    }
];
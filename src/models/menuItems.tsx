import {dialogContent, toggleDialog} from "../components/UI_Components/UI_Dialog";
import {UserProfileMenuCard} from "../components/shared/authenticationShared/userProfileMenuCard";

interface menuItem {
    id: number
    name: string
    icon: string
    link: string | null
    action: () => void
    is_user: boolean
    is_staff: boolean
}

export const MenuItems : menuItem[] = [
    {
        id: 1,
        name: `Home`,
        icon: `<i class="fa-solid fa-house-heart"></i>`,
        link: '/',
        action: () => {return},
        is_user: false,
        is_staff: false
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
        is_user: true,
        is_staff: false
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
        is_user: false,
        is_staff: false
    }
];
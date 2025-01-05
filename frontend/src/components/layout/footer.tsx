import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import { SidebarFooter, SidebarItem } from "@/components/sidebar";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useUserStore } from "@/store/user-store";
import { useNavigate } from "@tanstack/react-router";

export function Footer() {
  const { user, removeCredentials } = useUserStore();
  const navigate = useNavigate();

  const logout = () => {
    removeCredentials();
    navigate({ to: "/login" });
  };
  return (
    <SidebarFooter className='max-lg:hidden'>
      <Dropdown>
        <DropdownButton as={SidebarItem}>
          <span className='flex min-w-0 items-center gap-3'>
            <Avatar
              src='/profile-photo.jpg'
              className='size-10'
              square
              alt=''
            />
            <span className='min-w-0'>
              <span className='block truncate text-sm/5 font-medium text-zinc-950 dark:text-white'>
                {user?.firstName}
              </span>
              <span className='block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400'>
                {user?.email}
              </span>
            </span>
          </span>
          <ChevronUpIcon />
        </DropdownButton>
        <DropdownMenu
          className='min-w-64'
          anchor='top start'
        >
          <DropdownItem href='/my-profile'>
            <UserIcon />
            <DropdownLabel>My profile</DropdownLabel>
          </DropdownItem>
          <DropdownItem href='/settings'>
            <Cog8ToothIcon />
            <DropdownLabel>Settings</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem href='/privacy-policy'>
            <ShieldCheckIcon />
            <DropdownLabel>Privacy policy</DropdownLabel>
          </DropdownItem>
          <DropdownItem href='/share-feedback'>
            <LightBulbIcon />
            <DropdownLabel>Share feedback</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={logout}>
            <ArrowRightStartOnRectangleIcon />
            <DropdownLabel>Sign out</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </SidebarFooter>
  );
}

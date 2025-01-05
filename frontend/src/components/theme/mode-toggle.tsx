import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/button";
import { DropdownMenu, DropdownItem, Dropdown, DropdownButton } from "@/components/dropdown";
import { useTheme } from "@/components/theme/theme-provider";
import { Avatar } from "../avatar";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Dropdown>
      <DropdownButton>{theme === "light" ? <SunIcon /> : <MoonIcon />}</DropdownButton>
      <DropdownMenu
        className='min-w-64'
        anchor='bottom end'
      >
        <DropdownItem onClick={() => setTheme("light")}>Light</DropdownItem>
        <DropdownItem onClick={() => setTheme("dark")}>Dark</DropdownItem>
        <DropdownItem onClick={() => setTheme("system")}>System</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

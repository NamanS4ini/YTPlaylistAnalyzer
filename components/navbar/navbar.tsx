import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CircleHelpIcon, Github, CircleAlertIcon } from "lucide-react";
import Link from "next/link";

export default function NavigationMenuDemo() {
  return (
    <div className="fixed backdrop-blur-sm bg-black/70 z-50 flex justify-center p-2 w-full top-0">
      <div className="flex items-center justify-between w-full max-w-7xl gap-4">
        <div>
          <Link href="/">
            <h1 className="sm:text-2xl font-bold">YouTube Analyzer</h1>
          </Link>
        </div>
        <div>
          <NavigationMenu className="dark">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="sm:px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/saved"
                  className="sm:px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Saved
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="sm:px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-48">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/about" className="flex">
                          <h1 className="font-medium flex items-center gap-2">
                            <CircleHelpIcon />
                            About
                          </h1>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/feedback" className="flex">
                          <h1 className="font-medium flex items-center gap-2">
                            <CircleAlertIcon />
                            Feedback
                          </h1>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          target="_blank"
                          href="https://github.com/NamanS4ini/YTPlaylistAnalyzer"
                          className="flex"
                        >
                          <h1 className="font-medium flex items-center gap-2">
                            <Github />
                            Github
                          </h1>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

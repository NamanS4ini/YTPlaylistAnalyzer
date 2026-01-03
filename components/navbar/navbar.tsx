import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CircleHelpIcon, Github, CircleAlertIcon, User } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import SignIn from "@/components/auth/signin";
import { SignOut } from "@/components/auth/signout";

export default async function NavigationMenuDemo() {
  const session = await auth();

  return (
    <div className="fixed backdrop-blur-sm bg-black/70 z-50 flex justify-center p-2 w-full top-0">
      <div className="flex items-center justify-between w-full max-w-7xl gap-4">
        <div>
          <Link href="/">
            <h1 className="sm:text-2xl text-md font-bold">YouTube Analyzer</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <NavigationMenu className="dark">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="px-2 text-sm py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/saved"
                  className="px-2 text-sm py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
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
                        <Link href="/about">
                          <h1 className="font-medium flex items-center gap-2">
                            <CircleHelpIcon />
                            About
                          </h1>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/feedback">
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

          {/* Auth Section */}
          <div className="border-l border-zinc-700 pl-2 ml-2">
            {session?.user ? (
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="h-8 w-8 rounded-full border-2 border-zinc-700"
                  />
                )}
                <SignOut />
              </div>
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { CircleHelpIcon, Github, CircleAlertIcon, Menu, Upload, Home, Bookmark, UploadIcon, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
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
                  More
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
                        <Link href="https://buymeacoffee.com/namansaini" target="_blank" rel="noopener noreferrer">
                          <h1 className="font-medium flex items-center gap-2">
                            <Coffee />
                            Buy me a Coffee
                          </h1>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/upload">
                          <h1 className="font-medium flex items-center gap-2">
                            <UploadIcon />
                            Upload
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
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={32}
                    height={32}
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

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-zinc-900 border-zinc-800 text-white">
              <SheetHeader>
                <SheetTitle className="text-white text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="text-lg py-2 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/saved"
                    className="text-lg py-2 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Bookmark className="h-5 w-5" />
                    Saved
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/upload"
                    className="text-lg py-2 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="text-lg py-2 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <CircleHelpIcon className="h-5 w-5" />
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/feedback"
                    className="text-lg py-2 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <CircleAlertIcon className="h-5 w-5" />
                    Feedback
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    target="_blank"
                    href="https://github.com/NamanS4ini/YTPlaylistAnalyzer"
                    className="text-lg py-2 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    Github
                  </Link>
                </SheetClose>

                {/* Auth Section for Mobile */}
                <div className="border-t border-zinc-700 pt-4 mt-4">
                  {session?.user ? (
                    <div className="flex flex-col gap-3">
                      {session.user.image && (
                        <div className="flex items-center gap-3">
                          <Image
                            src={session.user.image}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full border-2 border-zinc-700"
                          />
                          <span className="text-sm text-zinc-400">{session.user.email}</span>
                        </div>
                      )}
                      <SignOut />
                    </div>
                  ) : (
                    <SignIn />
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

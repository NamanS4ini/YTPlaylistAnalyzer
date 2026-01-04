import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LogOut, AlertCircle } from "lucide-react"

export function SignOut() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="cursor-pointer text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                    size="sm"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                </Button>
            </DialogTrigger>
            <DialogContent className="dark bg-zinc-900 border-zinc-800 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white text-2xl flex items-center gap-2">
                        <AlertCircle className="h-6 w-6 text-yellow-500" />
                        Sign Out
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Are you sure you want to sign out?
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                        <p className="text-sm text-zinc-300">
                            You&apos;ll need to sign in again to access your{" "}
                            <span className="text-white font-medium">Liked Videos</span> playlist.
                        </p>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="dark cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </DialogTrigger>
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}
                        className="flex-1"
                    >
                        <Button
                            type="submit"
                            variant="destructive"
                            className="w-full cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
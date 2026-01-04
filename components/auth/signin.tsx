import { signIn } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, Lock, Eye } from "lucide-react"

export default function SignIn() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer dark">
                    Sign In
                </Button>
            </DialogTrigger>
            <DialogContent className="dark bg-zinc-900 border-zinc-800 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white text-2xl">Sign In with Google</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Access your Liked Videos playlist
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Privacy Notice */}
                    <div className="bg-blue-950/30 border border-blue-900/50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2 text-blue-400 font-semibold">
                            <Shield className="h-5 w-5" />
                            <span>Your Privacy is Protected</span>
                        </div>

                        <div className="space-y-2 text-sm text-zinc-300">
                            <div className="flex items-start gap-2">
                                <Lock className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                                <p>We <strong>do not collect</strong> your email or profile picture</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Eye className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                                <p>No personal data is stored on our servers</p>
                            </div>
                        </div>
                    </div>

                    {/* Why Sign In */}
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">Why sign in?</h4>
                        <p className="text-sm text-zinc-400">
                            YouTube restricts access to <span className="text-white font-medium">Liked Videos</span> playlist.
                            Authentication is required to analyze this special playlist.
                        </p>
                        <p className="text-sm text-orange-400 mt-2">
                            <strong>Note:</strong> Watch Later is not accessible via YouTube&apos;s API due to privacy restrictions.
                        </p>
                    </div>

                    {/* Sign In Button */}
                    <form
                        action={async () => {
                            "use server"
                            await signIn("google")
                        }}
                        className="w-full"
                    >
                        <Button
                            type="submit"
                            className="w-full cursor-pointer bg-white hover:bg-gray-100 text-gray-900 font-semibold py-6 transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
} 
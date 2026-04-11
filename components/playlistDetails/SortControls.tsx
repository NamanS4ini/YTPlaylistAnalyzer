import Image from "next/image";
import SettingsPopover from "../settings/SettingsPopover";

interface SortControlsProps {
    handelSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handelReverse: () => void;
    Reversed: boolean;
}

export default function SortControls({ handelSort, handelReverse, Reversed }: SortControlsProps) {
    return (
        <div>
            <h2 className="md:text-4xl text-2xl flex items-center gap-5 justify-between font-bold">
                Videos in Playlist

                <SettingsPopover currentPage="playlist" />
            </h2>
            <div className="flex gap-10 justify-center md:justify-start items-center p-5">
                <h2 className="text-xl md:text-2xl flex justify-between font-bold">
                    Sort By:{" "}
                </h2>
                <div className="flex gap-4 justify-center items-center">
                    <select
                        defaultValue="position"
                        onChange={(e) => handelSort(e)}
                        className="text-sm rounded-lg dark block p-2.5 bg-zinc-900 border-zinc-800 placeholder-zinc-400 text-white"
                    >
                        <option value="position">Playlist Order</option>
                        <option value="views">Views</option>
                        <option value="likes">Likes</option>
                        <option value="duration">Video Length</option>
                        <option value="comments">Comments</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    <div className="flex justify-center items-center h-full">
                        <button className="cursor-pointer" onClick={handelReverse}>
                            {Reversed ? (
                                <Image
                                    className=""
                                    width={20}
                                    height={20}
                                    src="/descending.svg"
                                    alt="Reversed"
                                />
                            ) : (
                                <Image
                                    className=""
                                    width={20}
                                    height={20}
                                    src="/ascending.svg"
                                    alt="Normal"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

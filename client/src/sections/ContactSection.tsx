'use client'

import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "react-toastify";

export default function ContactSection() {

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setToken(null);

        const formData = new FormData(e.currentTarget);
        formData.append(
            "access_key",
            "4b7d3a8c-1b8b-4b09-86c7-375eecef5431"
        );

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Form Submitted Successfully");

                // ✅ Save token / submission id
                setToken(data.data?.id || "Token not available");

                e.currentTarget.reset();
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("Network Error");
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle
                text1="Contact"
                text2="Grow your channel"
                text3="Have questions about our AI? Ready to scale your views? Let's talk."
            />

            <form
                onSubmit={onSubmit}
                className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full'
            >

                {/* Name */}
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70 }}
                >
                    <p className='mb-2 font-medium'>Your name</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-pink-500'>
                        <UserIcon className='size-5' />
                        <input
                            name='name'
                            type="text"
                            required
                            placeholder='Enter your name'
                            className='w-full p-3 outline-none bg-transparent'
                        />
                    </div>
                </motion.div>

                {/* Email */}
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70 }}
                >
                    <p className='mb-2 font-medium'>Email id</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-pink-500'>
                        <MailIcon className='size-5' />
                        <input
                            name='email'
                            type="email"
                            required
                            placeholder='Enter your email'
                            className='w-full p-3 outline-none bg-transparent'
                        />
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    className='sm:col-span-2'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70 }}
                >
                    <p className='mb-2 font-medium'>Message</p>
                    <textarea
                        name='message'
                        rows={8}
                        required
                        placeholder='Enter your message'
                        className='focus:border-pink-500 resize-none w-full p-3 outline-none rounded-lg border border-slate-700 bg-transparent'
                    />
                </motion.div>

                {/* Submit */}
                <motion.button
                    type='submit'
                    disabled={loading}
                    className='w-max flex items-center gap-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white px-10 py-3 rounded-full'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70 }}
                >
                    {loading ? "Sending..." : "Submit"}
                    <ArrowRightIcon className="size-5" />
                </motion.button>
            </form>

            {/* ✅ Token Display */}
            {token && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 max-w-2xl mx-auto bg-slate-900 border border-slate-700 rounded-lg p-4 text-green-400 text-sm break-all"
                >
                    <p className="font-semibold text-green-500 mb-1">
                        Submission Token
                    </p>
                    <p>{token}</p>
                </motion.div>
            )}
        </div>
    );
}

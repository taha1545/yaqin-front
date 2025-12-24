"use client";

import { motion } from "framer-motion"; // Changed from motion/react for better compatibility
import { useEffect, useState } from "react";

export function FloatingPaths({ position }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
			} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
			} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
			} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
		width: 0.5 + i * 0.03,
	}));

	if (!mounted) return null;

	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			<svg
				className="h-full w-full text-primary/20 dark:text-white/10"
				fill="none"
				viewBox="0 0 696 316"
				preserveAspectRatio="xMidYMid slice"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="currentColor"
						strokeWidth={path.width}
						strokeLinecap="round"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{
							pathLength: [0.1, 0.4, 0.1],
							pathOffset: [0, 1],
							opacity: [0, 0.4, 0],
						}}
						transition={{
							duration: 15 + (path.id % 10), // Deterministic duration to avoid hydration error
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					/>
				))}
			</svg>
		</div>
	);
}
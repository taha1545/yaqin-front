"use client";

import Image from "next/image";
import React from "react";

export function Logo(props) {
    return (
        <Image
        src={'/logo.jpg'}
        width={40}
        height={40}
        alt="icon"
        />
    );
}

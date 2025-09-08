"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/common";
import { ArrowRight } from "lucide-react";

const PortfolioCTA = React.memo(() => {
  return (
    <AnimatedSection className="py-20 px-4 text-center bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
          有项目想法？
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          我很乐意与您讨论您的项目需求，让我们一起创造出色的数字体验。
        </p>
        <Button
          size="lg"
          asChild
          className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg transition-all duration-300 hover:shadow-lg"
        >
          <Link href="/contact">
            联系我
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </AnimatedSection>
  );
});

PortfolioCTA.displayName = "PortfolioCTA";

export default PortfolioCTA;
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { playBackButtonSound } from "@/lib/sounds";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" onClick={() => playBackButtonSound()} className="inline-block mb-6">
          <Button
            variant="outline"
            className="bg-black/50 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Card className="bg-black/50 border-white/20 text-white backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-yellow-400">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-300">
            <p className="text-lg leading-relaxed">
              Have questions about the solar system or feedback about this
              application? We'd love to hear from you!
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Get in Touch
                </h3>
                <p>
                  For inquiries, suggestions, or to report issues, please reach
                  out through the following channels:
                </p>
              </div>
              <div className="flex gap-4">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  Email Us
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
                >
                  GitHub
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


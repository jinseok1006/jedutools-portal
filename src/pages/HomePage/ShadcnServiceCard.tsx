import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Library } from "lucide-react";

interface ShadcnServiceCardProps {
  title: string;
  description: string;
  imgSrc: string;
  github?: string | null;
  docs?: string | null;
  linkbtn: React.ReactNode;
}

export default function ShadcnServiceCard({
  title,
  description,
  imgSrc,
  github,
  docs,
  linkbtn
}: ShadcnServiceCardProps) {

  return (
    <Card className="flex flex-col w-full max-w-xs overflow-hidden transition-all duration-300 border rounded-lg shadow-sm bg-card text-card-foreground hover:shadow-md gap-2 py-2">
      {imgSrc && (
        <div className="flex items-center justify-center p-4 overflow-hidden h-28">
          <img
            src={imgSrc}
            alt={`${title} 로고`}
            className="object-contain w-auto h-full max-w-full"
          />
        </div>
      )}
      <CardHeader className="px-3 pt-3 pb-1">
        <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-3 pt-0">
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex flex-row items-center gap-2 p-2 pt-1.5 bg-muted/20">
        {linkbtn}
        
        <div className="flex gap-2 ml-auto">
          <Button
            asChild={!!github}
            variant="outline"
            size="icon"
            className="w-9 h-9"
            disabled={!github}
            aria-label="GitHub"
          >
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
              </a>
            ) : (
              <Github className="w-4 h-4" /> 
            )}
          </Button>

          <Button
            asChild={!!docs}
            variant="outline"
            size="icon"
            className="w-9 h-9"
            disabled={!docs}
            aria-label="문서"
          >
            {docs ? (
              <a
                href={docs}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Library className="w-4 h-4" />
              </a>
            ) : (
              <Library className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 
import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "jedutools@gmail.com";

export default function Contact() {
  return (
    <div id="contact" className="my-10 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div
          className="flex flex-col items-start text-left"
        >
          <div className="flex items-center mb-3">
            <MessageSquare className="h-5 w-5 text-blue-800 mr-2" />
            <h2 className="font-medium text-gray-800">
              문의 및 안내
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            궁금한 점이 있거나 더 많은 정보를 원하시면 아래 방법으로 연락하세요.
          </p>

          
            <Button asChild>
              <a
                href={`mailto:${ADMIN_EMAIL}`}
                className="inline-flex items-center"
              >
                <Mail className="w-5 h-5 mr-2 -ml-1" />
                문의 메일 보내기
              </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
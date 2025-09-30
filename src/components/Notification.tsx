import { Card, CardContent } from "./ui/card";

interface NotificationProps {
  title: string;
  message: string | React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const Notification = ({
  title,
  message,
  buttonText,
  onButtonClick,
  className = "mb-6 bg-blue-600 text-white border-blue-600",
}: NotificationProps) => {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm">
          {message}
          {buttonText && (
            <>
              {" "}
              <button
                type="button"
                className="underline"
                onClick={onButtonClick}
              >
                {buttonText}
              </button>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default Notification;

type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[]> | undefined;
  };
};
type MessageBoxProps = {
  type: 'success' | 'error';
  content: React.ReactNode;
};
const MessageBox = ({ type, content }: MessageBoxProps) => {
  return (
    <div
      className={`bg-accent px-4 py-2 rounded-md ${
        type === 'success' ? 'text-green-500' : 'text-red-500'
      }`}
    >
      {type === 'success' ? '🎉' : '🚨'}: {content}
    </div>
  );
};

const DisplayServerActionResponse = ({ result }: Props) => {
  const { data, serverError, validationErrors } = result;

  return (
    <div>
      {data?.message && <MessageBox type='success' content={data.message} />}
      {serverError && <MessageBox type='error' content={serverError} />}
      {validationErrors && (
        <MessageBox
          type='success'
          content={Object.keys(validationErrors).map((err) => {
            return (
              <p key={err}>
                {`${err}: ${
                  validationErrors[err as keyof typeof validationErrors]
                }`}{' '}
              </p>
            );
          })}
        />
      )}
    </div>
  );
};
export default DisplayServerActionResponse;

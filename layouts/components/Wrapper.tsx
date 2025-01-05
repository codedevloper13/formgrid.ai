type WapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WapperProps) => {
  return <main>{children}</main>;
};
export default Wrapper;

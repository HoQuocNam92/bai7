import React from "react";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/stylesheets/jumbotron-narrow.css" />
        <link rel="stylesheet" href="/stylesheets/bootstrap.min.css" />
      </head>
      <body>
        <div className="container">
          <div className="header clearfix">
            <ul className="nav nav-pills pull-right">
              <li role="presentation" className="active">
                <a href="/order/create_payment_url">Tạo mới GD thanh toán</a>
              </li>
              <li role="presentation" className="active">
                <a href="/order/querydr">API truy vấn kết quả thanh toán</a>
              </li>
              <li role="presentation" className="active">
                <a href="/order/refund">API hoàn tiền giao dịch</a>
              </li>
            </ul>
            <h3 className="text-muted">VNPAY DEMO</h3>
          </div>

          {children}

          <footer className="footer">
            <p>&copy; VNPAY {currentYear} tiepse</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;

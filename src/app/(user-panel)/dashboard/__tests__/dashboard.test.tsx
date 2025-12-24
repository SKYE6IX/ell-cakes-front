import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import Dashboard from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Dashboard component page", () => {
  it("Render page text content", () => {
    // Arrange
    render(
      <MockedProvider>
        <Dashboard />
      </MockedProvider>
    );

    // Assert
    const dashboardTitle = screen.getByTestId("dashboard-title");
    const dashbaordCardlabels = screen.getAllByRole("heading", { level: 5 });

    // Act
    expect(dashboardTitle).toBeInTheDocument();
    expect(dashboardTitle).toHaveTextContent("Мои данные");
    expect(dashbaordCardlabels.length).toBeGreaterThan(1);
    for (const el of dashbaordCardlabels) {
      expect(el).toBeInTheDocument();
    }
  });
});

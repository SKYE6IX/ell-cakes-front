import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServingTimer from "../serving-timer/ServingTimer";

describe("Serving Timer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("render initial time and buttons", () => {
    render(<ServingTimer />);

    expect(screen.getByText("15:00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "15 мин" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "30 мин" })).toBeInTheDocument();
    expect(screen.queryByText("Можно подавать!")).not.toBeInTheDocument();
  });

  it("start countdown and show stop button", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ServingTimer />);

    await user.click(screen.getByRole("button", { name: "15 мин" }));
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("14:59")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Стоп" })).toBeInTheDocument();
  });

  it("stop and reset timer on second click", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ServingTimer />);

    await user.click(screen.getByRole("button", { name: "30 мин" }));
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    await user.click(screen.getByRole("button", { name: "Стоп" }));

    expect(screen.getByText("30:00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "30 мин" })).toBeInTheDocument();
  });

  it("show ready message when time is over", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ServingTimer />);

    await user.click(screen.getByRole("button", { name: "15 мин" }));
    act(() => {
      jest.advanceTimersByTime(15 * 60 * 1000);
    });

    expect(screen.getByText("00:00")).toBeInTheDocument();
    expect(screen.getByText("Можно подавать!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "15 мин" })).toBeInTheDocument();
  });
});

def print_board(board):
    for row in board:
        print("|".join(row))
        print("-" * 5)


def check_winner(board, player):
    # Check rows, columns, and diagonals
    for i in range(3):
        if all(board[i][j] == player for j in range(3)) or \
           all(board[j][i] == player for j in range(3)):
            return True
    if all(board[i][i] == player for i in range(3)) or \
       all(board[i][2 - i] == player for i in range(3)):
        return True
    return False


def is_board_full(board):
    return all(board[i][j] != ' ' for i in range(3) for j in range(3))


def tic_tac_toe():
    board = [[' ' for _ in range(3)] for _ in range(3)]
    players = ['X', 'O']
    turn = 0

    while True:
        print_board(board)
        current_player = players[turn % 2]
        print(f"Player {current_player}'s turn")

        row = int(input("Enter row (0, 1, or 2): "))
        col = int(input("Enter column (0, 1, or 2): "))

        if row < 0 or row > 2 or col < 0 or col > 2:
            print("Invalid input! Row and column must be between 0 and 2.")
            continue

        if board[row][col] != ' ':
            print("That cell is already taken!")
            continue

        board[row][col] = current_player

        if check_winner(board, current_player):
            print_board(board)
            print(f"Player {current_player} wins!")
            break

        if is_board_full(board):
            print_board(board)
            print("It's a tie!")
            break

        turn += 1


if __name__ == "__main__":
    tic_tac_toe()
